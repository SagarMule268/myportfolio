from app.services import file_upload as file_upload_service


def test_about_management_requires_admin_and_supports_create_update(
    client,
    auth_headers,
):
    payload = {
        "title": "About me",
        "description": "A software developer.",
        "professional_summary": "I build web applications.",
        "resume_url": "https://example.com/resume.pdf",
        "profile_image": None,
    }

    unauthorized = client.post("/api/v1/about/", json=payload)
    assert unauthorized.status_code == 401

    created = client.post(
        "/api/v1/about/",
        json=payload,
        headers=auth_headers,
    )
    assert created.status_code == 201
    about_id = created.json()["id"]

    updated = client.patch(
        f"/api/v1/about/{about_id}",
        json={"title": "Updated about"},
        headers=auth_headers,
    )
    assert updated.status_code == 200
    assert updated.json()["title"] == "Updated about"


def test_social_link_management_requires_admin_and_supports_crud(
    client,
    auth_headers,
):
    payload = {
        "label": "GitHub",
        "platform": "github",
        "icon": "github",
        "url": "https://github.com/example",
        "is_visible": False,
    }

    unauthorized = client.post("/api/v1/social-links/", json=payload)
    assert unauthorized.status_code == 401

    created = client.post(
        "/api/v1/social-links/",
        json=payload,
        headers=auth_headers,
    )
    assert created.status_code == 201
    social_link_id = created.json()["id"]

    links = client.get("/api/v1/social-links/", headers=auth_headers)
    assert links.status_code == 200
    assert links.json()[0]["label"] == "GitHub"

    updated = client.patch(
        f"/api/v1/social-links/{social_link_id}",
        json={"label": "GitHub profile"},
        headers=auth_headers,
    )
    assert updated.status_code == 200
    assert updated.json()["label"] == "GitHub profile"
    assert updated.json()["is_visible"] is False

    deleted = client.delete(
        f"/api/v1/social-links/{social_link_id}",
        headers=auth_headers,
    )
    assert deleted.status_code == 204


def test_upload_requires_admin_and_returns_uploaded_file_url(
    client,
    auth_headers,
    monkeypatch,
):
    def fake_cloudinary_upload(file, resource_type, **_options):
        file.read()
        return {
            "public_id": f"portfolio/test-{resource_type}",
            "secure_url": f"https://res.cloudinary.com/example/{resource_type}/test-file",
            "resource_type": resource_type,
            "format": "png" if resource_type == "image" else "pdf",
            "bytes": 8,
        }

    monkeypatch.setattr(
        file_upload_service.cloudinary.uploader,
        "upload",
        fake_cloudinary_upload,
    )

    unauthorized = client.post(
        "/api/v1/uploads/",
        files={"file": ("profile.png", b"\x89PNG\r\n\x1a\n", "image/png")},
    )
    assert unauthorized.status_code == 401

    image_upload = client.post(
        "/api/v1/uploads/",
        headers=auth_headers,
        files={"file": ("profile.png", b"\x89PNG\r\n\x1a\n", "image/png")},
    )

    document_upload = client.post(
        "/api/v1/uploads/",
        headers=auth_headers,
        files={"file": ("resume.pdf", b"%PDF-1.7 test", "application/pdf")},
    )

    assert image_upload.status_code == 201
    assert image_upload.json()["resource_type"] == "image"
    assert image_upload.json()["url"].startswith("https://")
    assert document_upload.status_code == 201
    assert document_upload.json()["resource_type"] == "raw"
    assert document_upload.json()["url"].startswith("https://")


def test_upload_rejects_unsupported_file_type(client, auth_headers):
    response = client.post(
        "/api/v1/uploads/",
        headers=auth_headers,
        files={"file": ("notes.txt", b"plain text", "text/plain")},
    )

    assert response.status_code == 400


def test_upload_rejects_content_that_does_not_match_file_type(client, auth_headers):
    response = client.post(
        "/api/v1/uploads/",
        headers=auth_headers,
        files={"file": ("profile.png", b"not an image", "image/png")},
    )

    assert response.status_code == 400
