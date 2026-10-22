from datetime import datetime, timezone

from app.models.about import About
from app.models.education import Education
from app.models.experience import Experience
from app.models.hero import Hero
from app.models.project import Project
from app.models.skill import Skill
from app.models.social_links import SocialLinks


def test_get_portfolio_returns_empty_collections(client):
    response = client.get("/api/v1/portfolio/")

    assert response.status_code == 200
    assert response.json() == {
        "hero": None,
        "about": None,
        "projects": [],
        "experiences": [],
        "education": [],
        "skills": [],
        "social_links": [],
    }


def test_get_portfolio_returns_display_data_and_only_visible_social_links(
    client,
    db_session,
):
    db_session.add_all(
        [
            Hero(
                greeting="Hello",
                title="Developer",
                subtitle="Full stack",
                description="I build useful web applications.",
            ),
            About(
                title="About me",
                description="A software developer.",
                professional_summary="Experienced with full-stack development.",
                resume_url="https://example.com/resume.pdf",
            ),
            Project(
                title="Portfolio",
                description="A personal portfolio.",
                technologies="React, FastAPI",
            ),
            Experience(
                company="Example Co",
                position="Developer",
                description="Built web applications.",
                start_date=datetime(2024, 1, 1, tzinfo=timezone.utc),
            ),
            Education(
                institution="Example University",
                degree="BSc",
                start_date=datetime(2020, 1, 1, tzinfo=timezone.utc),
            ),
            Skill(name="Python", category="Backend"),
            SocialLinks(
                label="GitHub",
                platform="github",
                icon="github",
                url="https://github.com/example",
                is_visible=True,
            ),
            SocialLinks(
                label="Hidden link",
                platform="other",
                icon="link",
                url="https://example.com",
                is_visible=False,
            ),
        ]
    )
    db_session.flush()

    response = client.get("/api/v1/portfolio/")

    assert response.status_code == 200
    portfolio = response.json()
    assert portfolio["hero"]["title"] == "Developer"
    assert portfolio["about"]["title"] == "About me"
    assert [project["title"] for project in portfolio["projects"]] == ["Portfolio"]
    assert [item["company"] for item in portfolio["experiences"]] == ["Example Co"]
    assert [item["institution"] for item in portfolio["education"]] == [
        "Example University"
    ]
    assert [item["name"] for item in portfolio["skills"]] == ["Python"]
    assert [item["label"] for item in portfolio["social_links"]] == ["GitHub"]
