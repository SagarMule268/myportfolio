from uuid import UUID


def project_payload():
    return {
        # Replace these fields with the exact fields
        # required by your ProjectCreate schema.
        "title": "Test Project",
        "description": "Project created during automated testing",
    }


def test_get_projects_public(client):
    response = client.get("/api/v1/projects")

    assert response.status_code == 200


def test_create_project_requires_authentication(client):
    response = client.post(
        "/api/v1/projects",
        json=project_payload(),
    )

    assert response.status_code == 401


def test_create_project_with_authentication(client, auth_headers):
    response = client.post(
        "/api/v1/projects",
        headers=auth_headers,
        json=project_payload(),
    )

    assert response.status_code == 201

    data = response.json()

    assert "id" in data
    assert UUID(data["id"])
    assert data["title"] == "Test Project"


def test_create_project_with_invalid_token(client):
    response = client.post(
        "/api/v1/projects",
        headers={
            "Authorization": "Bearer invalid-token",
        },
        json=project_payload(),
    )

    assert response.status_code == 401