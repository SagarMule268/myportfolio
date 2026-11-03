import json
from urllib.error import HTTPError
from io import BytesIO

from app.core.config import settings
from app.models.skill import Skill


class FakeGroqResponse:
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        return False

    def read(self):
        return json.dumps(
            {"choices": [{"message": {"content": "Sagar uses Python."}}]}
        ).encode("utf-8")


def test_chat_sends_portfolio_context_to_groq(client, db_session, monkeypatch):
    monkeypatch.setattr(settings, "groq_api_key", "test-api-key")
    db_session.add(Skill(name="Python", category="Backend"))
    db_session.flush()
    captured = {}

    def fake_urlopen(request, timeout):
        captured["request"] = request
        captured["timeout"] = timeout
        captured["payload"] = json.loads(request.data)
        return FakeGroqResponse()

    monkeypatch.setattr("app.services.sage_chat.urlopen", fake_urlopen)

    response = client.post(
        "/api/v1/chat/",
        json={"messages": [{"role": "user", "content": "What skills does Sagar use?"}]},
    )

    assert response.status_code == 200
    assert response.json() == {"reply": "Sagar uses Python."}
    assert captured["request"].full_url == (
        "https://api.groq.com/openai/v1/chat/completions"
    )
    assert captured["request"].get_header("Authorization") == "Bearer test-api-key"
    assert captured["timeout"] == 20
    assert captured["payload"]["model"] == settings.groq_model
    assert "Python" in captured["payload"]["messages"][0]["content"]


def test_chat_returns_service_unavailable_without_groq_key(
    client,
    monkeypatch,
):
    monkeypatch.setattr(settings, "groq_api_key", None)

    response = client.post(
        "/api/v1/chat/",
        json={"messages": [{"role": "user", "content": "Tell me about Sagar"}]},
    )

    assert response.status_code == 503
    assert response.json()["error"]["message"] == (
        "Sage is unavailable because its AI service is not configured."
    )


def test_chat_exposes_groq_error_message(client, monkeypatch):
    monkeypatch.setattr(settings, "groq_api_key", "test-api-key")

    def fake_urlopen(request, timeout):
        raise HTTPError(
            request.full_url,
            400,
            "Bad Request",
            {},
            BytesIO(
                json.dumps(
                    {"error": {"message": "The requested model is unavailable."}}
                ).encode("utf-8")
            ),
        )

    monkeypatch.setattr("app.services.sage_chat.urlopen", fake_urlopen)

    response = client.post(
        "/api/v1/chat/",
        json={"messages": [{"role": "user", "content": "Tell me about Sagar"}]},
    )

    assert response.status_code == 502
    assert "The requested model is unavailable." in response.json()["error"]["message"]


def test_chat_requires_latest_message_to_be_from_user(client):
    response = client.post(
        "/api/v1/chat/",
        json={"messages": [{"role": "assistant", "content": "Hello"}]},
    )

    assert response.status_code == 422


def test_local_frontend_origin_is_allowed(client):
    response = client.options(
        "/api/v1/chat/",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "POST",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"
