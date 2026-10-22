import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./admin.css";

const API_ROOT = `${(import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "")}/api/v1`;
const TOKEN_KEY = "portfolio_admin_token";

const sections = {
  overview: { label: "Overview", icon: "⌂" },
  hero: {
    label: "Hero",
    icon: "✦",
    endpoint: "hero",
    singleton: true,
    fields: [
      { name: "greeting", label: "Greeting" },
      { name: "title", label: "Title" },
      { name: "subtitle", label: "Subtitle" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "profile_image", label: "Profile image URL", type: "url", optional: true, upload: "image" },
      { name: "primary_cta.text", label: "Primary button text", optional: true },
      { name: "primary_cta.url", label: "Primary button URL", type: "url", optional: true },
      { name: "secondary_cta.text", label: "Secondary button text", optional: true },
      { name: "secondary_cta.url", label: "Secondary button URL", type: "url", optional: true },
    ],
  },
  about: {
    label: "About",
    icon: "◉",
    endpoint: "about",
    singleton: true,
    fields: [
      { name: "title", label: "Section title" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "professional_summary", label: "Professional summary", type: "textarea" },
      { name: "resume_url", label: "Resume URL", type: "url", upload: "document" },
      { name: "profile_image", label: "Profile image URL", type: "url", optional: true, upload: "image" },
    ],
  },
  projects: {
    label: "Projects",
    singular: "project",
    icon: "▤",
    endpoint: "projects",
    fields: [
      { name: "title", label: "Project title" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image_url", label: "Image URL", type: "url", optional: true, upload: "image" },
      { name: "github_url", label: "GitHub URL", type: "url", optional: true },
      { name: "live_url", label: "Live URL", type: "url", optional: true },
      { name: "technologies", label: "Technologies (comma-separated)", optional: true },
      { name: "featured", label: "Featured project", type: "checkbox" },
    ],
  },
  experience: {
    label: "Experience",
    singular: "experience",
    icon: "↗",
    endpoint: "experience",
    fields: [
      { name: "position", label: "Position" },
      { name: "company", label: "Company" },
      { name: "location", label: "Location", optional: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "start_date", label: "Start date", type: "date" },
      { name: "end_date", label: "End date", type: "date", optional: true },
      { name: "is_current", label: "Current position", type: "checkbox" },
    ],
  },
  education: {
    label: "Education",
    singular: "education",
    icon: "⌑",
    endpoint: "education",
    fields: [
      { name: "institution", label: "Institution" },
      { name: "degree", label: "Degree" },
      { name: "field_of_study", label: "Field of study", optional: true },
      { name: "description", label: "Description", type: "textarea", optional: true },
      { name: "start_date", label: "Start date", type: "date" },
      { name: "end_date", label: "End date", type: "date", optional: true },
    ],
  },
  skills: {
    label: "Skills",
    singular: "skill",
    icon: "◇",
    endpoint: "skill",
    fields: [
      { name: "name", label: "Skill name" },
      { name: "category", label: "Category", optional: true },
      { name: "proficiency", label: "Proficiency (1–100)", type: "number", optional: true },
      { name: "icon_url", label: "Icon URL", type: "url", optional: true, upload: "image" },
      { name: "featured", label: "Featured skill", type: "checkbox" },
    ],
  },
  social: {
    label: "Social links",
    singular: "social link",
    icon: "◎",
    endpoint: "social-links",
    fields: [
      { name: "label", label: "Link label" },
      { name: "platform", label: "Platform" },
      { name: "icon", label: "Icon name" },
      { name: "url", label: "URL", type: "url" },
      { name: "is_visible", label: "Visible on portfolio", type: "checkbox" },
    ],
  },
  messages: { label: "Messages", icon: "✉", endpoint: "contact-message" },
};

const contentSections = ["hero", "about", "projects", "experience", "education", "skills", "social", "messages"];

function getErrorMessage(detail, fallback) {
  if (Array.isArray(detail)) return detail.map((item) => item.msg).join(" ");
  return typeof detail === "string" ? detail : fallback;
}

async function apiRequest(path, { token, ...options } = {}) {
  const headers = new Headers(options.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_ROOT}/${path.replace(/^\//, "")}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let detail;
    try {
      const body = await response.json();
      detail = body.detail ?? body.error?.message ?? body.message;
    } catch {
      detail = undefined;
    }
    const error = new Error(getErrorMessage(detail, `Request failed (${response.status}).`));
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) return null;
  return response.json();
}

function dateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function fieldValue(record, name, type) {
  const value = name.split(".").reduce((current, key) => current?.[key], record);
  if (type === "date") return dateInputValue(value);
  return value ?? (type === "checkbox" ? false : "");
}

function createPayload(section, values) {
  const payload = {};
  for (const field of sections[section].fields) {
    const value = values[field.name];
    const keys = field.name.split(".");
    let normalized = value;

    if (field.type === "number") normalized = value === "" ? null : Number(value);
    else if (field.type === "date") normalized = value ? new Date(value).toISOString() : null;
    else if (field.optional && typeof value === "string" && value.trim() === "") normalized = null;

    let target = payload;
    for (const key of keys.slice(0, -1)) {
      target[key] ??= {};
      target = target[key];
    }
    target[keys.at(-1)] = normalized;
  }

  for (const name of ["primary_cta", "secondary_cta"]) {
    if (section === "hero" && !payload[name].text && !payload[name].url) payload[name] = null;
  }
  return payload;
}

function AuthenticatedPage({ children }) {
  return sessionStorage.getItem(TOKEN_KEY)
    ? children
    : <Navigate to="/admin/login" replace />;
}

export function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (sessionStorage.getItem(TOKEN_KEY)) return <Navigate to="/admin" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const formData = new FormData(event.currentTarget);

    try {
      const result = await apiRequest("auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      sessionStorage.setItem(TOKEN_KEY, result.access_token);
      navigate("/admin", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-glow" aria-hidden="true" />
      <section className="admin-login-card">
        <Link className="admin-back-link" to="/">← Back to portfolio</Link>
        <div className="admin-login-mark">A</div>
        <p className="admin-eyebrow">PRIVATE WORKSPACE</p>
        <h1>Welcome back.</h1>
        <p className="admin-login-copy">Sign in to manage your portfolio content.</p>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-field">
            <span>Email address</span>
            <input name="email" type="email" autoComplete="username" required />
          </label>
          <label className="admin-field">
            <span>Password</span>
            <input name="password" type="password" autoComplete="current-password" minLength={8} required />
          </label>
          {error && <p className="admin-alert" role="alert">{error}</p>}
          <button className="admin-button admin-button-primary admin-login-submit" type="submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"} <span aria-hidden="true">↗</span>
          </button>
        </form>
        <p className="admin-login-footnote">Access is limited to authorized administrators.</p>
      </section>
    </main>
  );
}

export function ProtectedAdmin() {
  return (
    <AuthenticatedPage>
      <AdminDashboard />
    </AuthenticatedPage>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem(TOKEN_KEY);
  const [data, setData] = useState({});
  const [portfolio, setPortfolio] = useState({});
  const [activeSection, setActiveSection] = useState("overview");
  const [editing, setEditing] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [portfolioData, projects, experience, education, skills, social, messages] = await Promise.all([
        apiRequest("portfolio/"),
        apiRequest("projects/", { token }),
        apiRequest("experience/", { token }),
        apiRequest("education/", { token }),
        apiRequest("skill/", { token }),
        apiRequest("social-links/", { token }),
        apiRequest("contact-message/", { token }),
      ]);
      setPortfolio(portfolioData);
      setData({
        hero: portfolioData.hero ? [portfolioData.hero] : [],
        about: portfolioData.about ? [portfolioData.about] : [],
        projects,
        experience,
        education,
        skills,
        social,
        messages,
      });
    } catch (requestError) {
      if (requestError.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        navigate("/admin/login", { replace: true });
        return;
      }
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [navigate, token]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  function logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    navigate("/admin/login", { replace: true });
  }

  function openEditor(record = null) {
    setEditing(record);
    setEditorOpen(true);
    setError("");
  }

  async function saveRecord(values) {
    const config = sections[activeSection];
    const payload = createPayload(activeSection, values);
    const isUpdate = Boolean(editing?.id);
    const path = `${config.endpoint}/${isUpdate ? `${editing.id}` : ""}`;
    setBusy(true);
    setError("");
    try {
      await apiRequest(path, {
        method: isUpdate ? "PATCH" : "POST",
        token,
        body: JSON.stringify(payload),
      });
      setEditorOpen(false);
      setEditing(null);
      setNotice(`${config.label} ${isUpdate ? "updated" : "created"}.`);
      await loadContent();
    } catch (requestError) {
      if (requestError.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        navigate("/admin/login", { replace: true });
      } else {
        setError(requestError.message);
      }
    } finally {
      setBusy(false);
    }
  }

  async function deleteRecord(section, record) {
    if (!window.confirm(`Delete ${sections[section].label.toLowerCase()} “${record.title || record.name || record.label || record.position || record.subject || "this item"}”?`)) return;
    setBusy(true);
    setError("");
    try {
      await apiRequest(`${sections[section].endpoint}/${record.id}`, { method: "DELETE", token });
      setNotice(`${sections[section].singular || sections[section].label.toLowerCase()} deleted.`);
      await loadContent();
    } catch (requestError) {
      if (requestError.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        navigate("/admin/login", { replace: true });
      } else {
        setError(requestError.message);
      }
    } finally {
      setBusy(false);
    }
  }

  function changeSection(section) {
    setActiveSection(section);
    setEditorOpen(false);
    setEditing(null);
    setError("");
    setNotice("");
  }

  const activeConfig = sections[activeSection];
  const records = data[activeSection] ?? [];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link className="admin-brand" to="/">
          <span className="admin-brand-mark">A</span>
          <span><strong>Studio Admin</strong><small>Portfolio workspace</small></span>
        </Link>
        <div className="admin-nav-label">WORKSPACE</div>
        <nav className="admin-nav" aria-label="Admin navigation">
          {["overview", ...contentSections].map((section) => (
            <button
              className={`admin-nav-item ${activeSection === section ? "active" : ""}`}
              key={section}
              onClick={() => changeSection(section)}
              type="button"
            >
              <span className="admin-nav-icon">{sections[section].icon}</span>
              <span>{sections[section].label}</span>
              {section === "messages" && data.messages?.length > 0 && (
                <span className="admin-nav-count">{data.messages.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <Link className="admin-portfolio-link" to="/">↗ <span>View live portfolio</span></Link>
          <button className="admin-logout" type="button" onClick={logout}>
            <span className="admin-avatar">A</span>
            <span className="admin-logout-label"><strong>Administrator</strong><small>Sign out</small></span>
            <span className="admin-logout-icon">↗</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-breadcrumb"><span>Workspace</span><b>/</b><strong>{sections[activeSection].label}</strong></div>
          <div className="admin-topbar-actions">
            <span className="admin-secure-indicator"><i /> Secure session</span>
            <button className="admin-refresh" type="button" onClick={loadContent} aria-label="Refresh data" title="Refresh data">↻</button>
          </div>
        </header>

        <div className="admin-content">
          {notice && <div className="admin-toast" role="status">{notice}<button type="button" onClick={() => setNotice("")} aria-label="Dismiss">×</button></div>}
          {error && <div className="admin-alert admin-content-alert" role="alert">{error}</div>}
          {loading ? (
            <div className="admin-loading"><span className="admin-spinner" /> Loading your workspace…</div>
          ) : (
            activeSection === "overview" ? (
              <Overview data={data} portfolio={portfolio} onSelect={changeSection} />
            ) : activeSection === "messages" ? (
              <Messages records={records} busy={busy} onDelete={(record) => deleteRecord(activeSection, record)} />
            ) : editorOpen ? (
              <RecordEditor
                key={`${activeSection}-${editing?.id ?? "new"}`}
                section={activeSection}
                record={editing}
                token={token}
                busy={busy}
                onCancel={() => setEditorOpen(false)}
                onSave={saveRecord}
              />
            ) : (
              <RecordList
                section={activeSection}
                config={activeConfig}
                records={records}
                busy={busy}
                onAdd={() => openEditor()}
                onEdit={openEditor}
                onDelete={(record) => deleteRecord(activeSection, record)}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

function Overview({ data, portfolio, onSelect }) {
  const stats = [
    ["Projects", data.projects?.length ?? 0, "projects"],
    ["Experience", data.experience?.length ?? 0, "experience"],
    ["Skills", data.skills?.length ?? 0, "skills"],
    ["Messages", data.messages?.length ?? 0, "messages"],
  ];
  const recentMessages = [...(data.messages ?? [])]
    .sort((first, second) => new Date(second.created_at) - new Date(first.created_at))
    .slice(0, 3);

  return (
    <section className="admin-overview">
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">YOUR CONTROL ROOM</p>
          <h1>Good to see you.</h1>
          <p>Manage your portfolio content and keep everything up to date.</p>
        </div>
        <Link className="admin-button admin-button-primary" to="/">View portfolio <span>↗</span></Link>
      </div>
      <div className="admin-welcome-panel">
        <div className="admin-welcome-copy">
          <span className="admin-welcome-icon">✦</span>
          <div>
            <p className="admin-eyebrow">PORTFOLIO STATUS</p>
            <h2>{portfolio.hero?.title || portfolio.about?.title || "Your portfolio is ready to shape."}</h2>
            <p>Keep your story current by updating your work, experience, and skills.</p>
          </div>
        </div>
        <span className="admin-live-badge"><i /> Live portfolio</span>
      </div>
      <div className="admin-stat-grid">
        {stats.map(([label, count, section], index) => (
          <button key={label} className="admin-stat-card" onClick={() => onSelect(section)} type="button">
            <span className="admin-stat-top"><span>{label}</span><i>{["▤", "↗", "◇", "✉"][index]}</i></span>
            <strong>{String(count).padStart(2, "0")}</strong>
            <small>Manage {label.toLowerCase()} <span>→</span></small>
          </button>
        ))}
      </div>
      <div className="admin-overview-bottom">
        <section className="admin-panel admin-quick-panel">
          <div className="admin-panel-heading"><div><p className="admin-eyebrow">QUICK ACCESS</p><h2>Content library</h2></div></div>
          <div className="admin-quick-grid">
            {["hero", "about", "projects", "education", "social"].map((section) => (
              <button key={section} className="admin-quick-link" onClick={() => onSelect(section)} type="button">
                <span>{sections[section].icon}</span><strong>{sections[section].label}</strong><i>↗</i>
              </button>
            ))}
          </div>
        </section>
        <section className="admin-panel admin-recent-panel">
          <div className="admin-panel-heading">
            <div><p className="admin-eyebrow">INBOX</p><h2>Recent messages</h2></div>
            <button className="admin-text-link" onClick={() => onSelect("messages")} type="button">View all ↗</button>
          </div>
          {recentMessages.length ? recentMessages.map((message) => (
            <article className="admin-recent-message" key={message.id}>
              <span className="admin-message-avatar">{message.name?.slice(0, 1).toUpperCase()}</span>
              <div><strong>{message.name}</strong><p>{message.subject || message.message}</p></div>
              <span className="admin-message-date">{new Date(message.created_at).toLocaleDateString()}</span>
            </article>
          )) : <p className="admin-muted-empty">Your inbox is clear. New contact messages will show up here.</p>}
        </section>
      </div>
    </section>
  );
}

function RecordList({ section, config, records, busy, onAdd, onEdit, onDelete }) {
  const isSingleton = config.singleton;
  return (
    <section>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">CONTENT MANAGEMENT</p>
          <h1>{config.label}</h1>
          <p>{section === "hero" ? "Shape the first impression visitors get." : section === "about" ? "Tell visitors who you are and what you do." : `Manage the ${config.label.toLowerCase()} shown on your portfolio.`}</p>
        </div>
        {(!isSingleton || records.length === 0) && (
          <button className="admin-button admin-button-primary" type="button" onClick={onAdd}>
          <span>＋</span> {isSingleton ? "Add content" : `Add ${config.singular}`}
          </button>
        )}
      </div>
      {records.length ? (
        <div className="admin-record-list">
          {records.map((record) => (
            <article className="admin-record-card" key={record.id}>
              <div className="admin-record-avatar">{(record.title || record.name || record.position || record.institution || "•").slice(0, 1).toUpperCase()}</div>
              <div className="admin-record-copy">
                <div className="admin-record-title">
                  <h2>{record.title || record.name || record.position || record.institution || record.label}</h2>
                  {record.featured && <span className="admin-featured-chip">Featured</span>}
                  {record.is_visible === false && <span className="admin-hidden-chip">Hidden</span>}
                </div>
                <p>{record.company || record.category || record.platform || record.subtitle || record.description || record.degree || "Portfolio content"}</p>
                <span className="admin-record-meta">
                  Updated {record.updated_at ? new Date(record.updated_at).toLocaleDateString() : "recently"}
                </span>
              </div>
              <div className="admin-record-actions">
                <button className="admin-button admin-button-quiet" type="button" onClick={() => onEdit(record)}>Edit</button>
                {!isSingleton && <button className="admin-icon-button danger" type="button" disabled={busy} onClick={() => onDelete(record)} aria-label={`Delete ${config.label.toLowerCase()} item`}>⌫</button>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="admin-empty-state">
          <span>{config.icon}</span>
          <h2>No {config.label.toLowerCase()} yet</h2>
          <p>Add your first item and it will be ready to display on your public portfolio.</p>
          <button className="admin-button admin-button-primary" onClick={onAdd} type="button">＋ Add {config.singular || config.label.toLowerCase()}</button>
        </div>
      )}
    </section>
  );
}

function RecordEditor({ section, record, token, busy, onCancel, onSave }) {
  const config = sections[section];
  const [values, setValues] = useState(() => Object.fromEntries(
    config.fields.map((field) => [field.name, fieldValue(record, field.name, field.type)]),
  ));
  const [uploadingField, setUploadingField] = useState("");
  const [uploadError, setUploadError] = useState(null);

  function updateField(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function uploadFieldFile(field, file) {
    const formData = new FormData();
    formData.append("file", file);
    setUploadingField(field.name);
    setUploadError(null);

    try {
      const uploadedFile = await apiRequest("uploads/", {
        method: "POST",
        token,
        body: formData,
      });
      updateField(field.name, uploadedFile.url);
    } catch (requestError) {
      setUploadError({ fieldName: field.name, message: requestError.message });
    } finally {
      setUploadingField("");
    }
  }

  return (
    <section>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">{config.label.toUpperCase()} · {record ? "EDIT" : "NEW"}</p>
          <h1>{record ? "Edit content" : `Add ${config.label.toLowerCase()}`}</h1>
          <p>Changes are saved directly to your portfolio content.</p>
        </div>
      </div>
      <form className="admin-editor-form" onSubmit={(event) => {
        event.preventDefault();
        onSave(values);
      }}>
        <div className="admin-form-grid">
          {config.fields.map((field) => field.type === "checkbox" ? (
            <label className="admin-checkbox-field" key={field.name}>
              <input
                checked={Boolean(values[field.name])}
                onChange={(event) => updateField(field.name, event.target.checked)}
                type="checkbox"
              />
              <span className="admin-checkbox-mark" />
              <span><strong>{field.label}</strong><small>Toggle this option on or off.</small></span>
            </label>
          ) : (
            <div className={`admin-field ${field.type === "textarea" ? "wide" : ""}`} key={field.name}>
              <label htmlFor={`field-${field.name}`}>
                {field.label}{!field.optional && <b> *</b>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={`field-${field.name}`}
                  required={!field.optional}
                  value={values[field.name]}
                  onChange={(event) => updateField(field.name, event.target.value)}
                  rows={4}
                />
              ) : (
                <input
                  id={`field-${field.name}`}
                  type={field.type === "date" ? "datetime-local" : field.type || "text"}
                  required={!field.optional}
                  min={field.type === "number" ? 1 : undefined}
                  max={field.name === "proficiency" ? 100 : undefined}
                  value={values[field.name]}
                  onChange={(event) => updateField(field.name, event.target.value)}
                />
              )}
              {field.upload && (
                <div className="admin-upload-control">
                  <label htmlFor={`upload-${field.name}`}>
                    {uploadingField === field.name ? "Uploading…" : "Choose a file to upload"}
                  </label>
                  <input
                    id={`upload-${field.name}`}
                    type="file"
                    accept={field.upload === "image"
                      ? ".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                      : ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"}
                    disabled={Boolean(uploadingField) || busy}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) void uploadFieldFile(field, file);
                      event.target.value = "";
                    }}
                  />
                  <small>
                    {field.upload === "image"
                      ? "JPEG, PNG, or WebP · up to 5 MB"
                      : "PDF, DOC, or DOCX · up to 5 MB"}
                  </small>
                  {uploadError?.fieldName === field.name && uploadingField === "" && (
                    <small className="admin-upload-error" role="alert">{uploadError.message}</small>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="admin-editor-footer">
          <p><span>*</span> Required fields</p>
          <div>
            <button className="admin-button admin-button-quiet" type="button" onClick={onCancel}>Cancel</button>
            <button className="admin-button admin-button-primary" type="submit" disabled={busy || Boolean(uploadingField)}>{uploadingField ? "Uploading…" : busy ? "Saving…" : "Save changes"} <span>↗</span></button>
          </div>
        </div>
      </form>
    </section>
  );
}

function Messages({ records, busy, onDelete }) {
  const orderedMessages = [...records].sort((first, second) => new Date(second.created_at) - new Date(first.created_at));
  return (
    <section>
      <div className="admin-page-heading">
        <div><p className="admin-eyebrow">INBOUND MESSAGES</p><h1>Your inbox</h1><p>Messages sent from your public portfolio contact form.</p></div>
        <span className="admin-inbox-count">{records.length} {records.length === 1 ? "message" : "messages"}</span>
      </div>
      {orderedMessages.length ? (
        <div className="admin-message-list">
          {orderedMessages.map((message) => (
            <article className="admin-message-card" key={message.id}>
              <div className="admin-message-card-top">
                <div className="admin-message-sender">
                  <span className="admin-message-avatar large">{message.name?.slice(0, 1).toUpperCase()}</span>
                  <div><h2>{message.name}</h2><a href={`mailto:${message.email}`}>{message.email}</a></div>
                </div>
                <div className="admin-message-meta">
                  {message.is_read === false && <span className="admin-unread-chip"><i /> New</span>}
                  <time dateTime={message.created_at}>{new Date(message.created_at).toLocaleString()}</time>
                </div>
              </div>
              {message.subject && <h3>{message.subject}</h3>}
              <p className="admin-message-body">{message.message}</p>
              <div className="admin-message-actions">
                <a className="admin-button admin-button-primary" href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject || "Your message"}`)}`}>Reply by email ↗</a>
                <button className="admin-button admin-button-quiet danger-text" type="button" disabled={busy} onClick={() => onDelete(message)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="admin-empty-state">
          <span>✉</span><h2>No messages yet</h2><p>When someone uses the contact form, their message will appear here.</p>
        </div>
      )}
    </section>
  );
}
