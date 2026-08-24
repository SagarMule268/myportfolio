def test_login_success(client, admin):
    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "testadmin@example.com",
            "password": "TestPassword123!",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password(client, admin):
    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "testadmin@example.com",
            "password": "WrongPassword123!",
        },
    )

    assert response.status_code == 401


def test_login_wrong_email(client):
    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "doesnotexist@example.com",
            "password": "TestPassword123!",
        },
    )

    assert response.status_code == 401


def test_login_invalid_email(client):
    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "not-an-email",
            "password": "TestPassword123!",
        },
    )

    assert response.status_code == 422