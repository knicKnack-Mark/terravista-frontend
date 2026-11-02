
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  CalendarDays,
  Settings,
  LogOut,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowRight,
  BedDouble,
  MapPin,
  Clock3,
  CheckCircle2,
  Menu,
} from "lucide-react";
const stats = [
  {
    label: "TOTAL PROPERTIES",
    value: "06",
    change: "Current demo listings",
    icon: Building2,
  },
  {
    label: "ACTIVE LISTINGS",
    value: "05",
    change: "Published properties",
    icon: CheckCircle2,
  },
  {
    label: "NEW INQUIRIES",
    value: "12",
    change: "Awaiting follow-up",
    icon: MessageSquare,
  },
  {
    label: "VIEWINGS SCHEDULED",
    value: "04",
    change: "Upcoming appointments",
    icon: CalendarDays,
  },
];

const inquiries = [
  {
    name: "Sophia Bennett",
    property: "The Glasswood Residence",
    date: "Today, 10:42 AM",
    status: "New",
    initials: "SB",
  },
  {
    name: "Ethan Carter",
    property: "The Solana Estate",
    date: "Today, 09:18 AM",
    status: "Contacted",
    initials: "EC",
  },
  {
    name: "Olivia Morgan",
    property: "Azure Heights Residence",
    date: "Yesterday, 04:35 PM",
    status: "Viewing",
    initials: "OM",
  },
  {
    name: "Noah Williams",
    property: "The Linden House",
    date: "Yesterday, 02:10 PM",
    status: "New",
    initials: "NW",
  },
];

const propertyRows = [
  {
    name: "The Glasswood Residence",
    location: "Makati City",
    price: "₱28,500,000",
    type: "For Sale",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=180&q=80",
  },
  {
    name: "The Solana Estate",
    location: "Tagaytay City",
    price: "₱45,000,000",
    type: "For Sale",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=180&q=80",
  },
  {
    name: "Azure Heights Residence",
    location: "Quezon City",
    price: "₱35,000 / month",
    type: "For Rent",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=180&q=80",
  },
];

function SidebarLink({
  href,
  icon: Icon,
  label,
  active = false,
}: {
  href: string;
  icon: typeof LayoutDashboard;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`admin-nav-link ${active ? "active" : ""}`}
    >
      <Icon size={18} strokeWidth={1.7} />
      <span>{label}</span>
      {active && <span className="admin-nav-indicator" />}
    </Link>
  );
}

export default function AdminDashboard() {
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-logo">
          <span className="admin-logo-mark">T</span>
          <span className="admin-logo-copy">
            <strong>TERRAVISTA</strong>
            <small>ADMINISTRATION</small>
          </span>
        </Link>

        <div className="admin-sidebar-label">WORKSPACE</div>

        <nav className="admin-navigation" aria-label="Admin navigation">
          <SidebarLink
            href="/admin"
            icon={LayoutDashboard}
            label="Overview"
            active
          />
          <SidebarLink
            href="/admin/properties"
            icon={Building2}
            label="Properties"
          />
          <SidebarLink
            href="/admin/inquiries"
            icon={MessageSquare}
            label="Inquiries"
          />
          <SidebarLink
            href="/admin/viewings"
            icon={CalendarDays}
            label="Viewings"
          />
        </nav>

        <div className="admin-sidebar-label admin-sidebar-label-lower">
          PREFERENCES
        </div>

        <nav className="admin-navigation">
          <SidebarLink
            href="/admin/settings"
            icon={Settings}
            label="Settings"
          />
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-profile">
            <div className="admin-profile-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <span>Property Manager</span>
            </div>
          </div>

          <Link href="/" className="admin-logout">
            <LogOut size={17} />
            <span>Back to website</span>
          </Link>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="admin-mobile-menu" aria-label="Menu">
              <Menu size={20} />
            </button>
            <div>
              <span className="admin-breadcrumb">WORKSPACE / OVERVIEW</span>
              <h1>Dashboard</h1>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <label className="admin-global-search">
              <Search size={16} />
              <input
                type="search"
                placeholder="Search dashboard..."
                aria-label="Search dashboard"
              />
              <kbd>⌘ K</kbd>
            </label>

            <button
              className="admin-notification-button"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span />
            </button>

            <div className="admin-topbar-avatar">A</div>
          </div>
        </header>

        <div className="admin-content">
          <section className="admin-welcome">
            <div>
              <span className="admin-eyebrow">PROPERTY MANAGEMENT</span>
              <h2>Good day, Administrator.</h2>
              <p>
                Here&apos;s what&apos;s happening with your properties today.
              </p>
            </div>

            <Link href="/admin/properties" className="admin-primary-button">
              <Plus size={17} />
              Add property
            </Link>
          </section>

          <section className="admin-stat-grid" aria-label="Dashboard statistics">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article className="admin-stat-card" key={stat.label}>
                  <div className="admin-stat-top">
                    <span>{stat.label}</span>
                    <div className="admin-stat-icon">
                      <Icon size={18} />
                    </div>
                  </div>

                  <strong className="admin-stat-value">{stat.value}</strong>
                  <span className="admin-stat-caption">{stat.change}</span>
                </article>
              );
            })}
          </section>

          <section className="admin-dashboard-grid">
            <article className="admin-panel admin-inquiries-panel">
              <div className="admin-panel-heading">
                <div>
                  <span className="admin-eyebrow">CLIENT ACTIVITY</span>
                  <h3>Recent inquiries</h3>
                </div>
                <Link href="/admin/inquiries" className="admin-text-link">
                  View all <ArrowUpRight size={15} />
                </Link>
              </div>

              <div className="admin-inquiry-list">
                {inquiries.map((inquiry) => (
                  <div className="admin-inquiry-row" key={inquiry.name}>
                    <div className="admin-inquiry-avatar">
                      {inquiry.initials}
                    </div>

                    <div className="admin-inquiry-details">
                      <strong>{inquiry.name}</strong>
                      <span>{inquiry.property}</span>
                      <small>
                        <Clock3 size={12} />
                        {inquiry.date}
                      </small>
                    </div>

                    <span
                      className={`admin-status admin-status-${inquiry.status.toLowerCase()}`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="admin-panel admin-quick-panel">
              <div className="admin-panel-heading">
                <div>
                  <span className="admin-eyebrow">SHORTCUTS</span>
                  <h3>Quick actions</h3>
                </div>
              </div>

              <div className="admin-quick-actions">
                <Link href="/admin/properties" className="admin-quick-action">
                  <span className="admin-quick-icon">
                    <Plus size={19} />
                  </span>
                  <span>
                    <strong>Add a property</strong>
                    <small>Create a new listing</small>
                  </span>
                  <ArrowRight size={16} />
                </Link>

                <Link href="/admin/inquiries" className="admin-quick-action">
                  <span className="admin-quick-icon">
                    <MessageSquare size={19} />
                  </span>
                  <span>
                    <strong>Review inquiries</strong>
                    <small>Respond to potential clients</small>
                  </span>
                  <ArrowRight size={16} />
                </Link>

                <Link href="/admin/viewings" className="admin-quick-action">
                  <span className="admin-quick-icon">
                    <CalendarDays size={19} />
                  </span>
                  <span>
                    <strong>Manage viewings</strong>
                    <small>Check scheduled appointments</small>
                  </span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          </section>

          <section className="admin-panel admin-properties-panel">
            <div className="admin-panel-heading">
              <div>
                <span className="admin-eyebrow">YOUR INVENTORY</span>
                <h3>Property overview</h3>
              </div>
              <Link href="/admin/properties" className="admin-text-link">
                Manage properties <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-property-table">
                <thead>
                  <tr>
                    <th>PROPERTY</th>
                    <th>PRICE</th>
                    <th>TYPE</th>
                    <th>STATUS</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {propertyRows.map((property) => (
                    <tr key={property.name}>
                      <td>
                        <div className="admin-table-property">
                          <img src={property.image} alt="" />
                          <div>
                            <strong>{property.name}</strong>
                            <span>
                              <MapPin size={12} />
                              {property.location}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="admin-table-price">{property.price}</td>
                      <td>{property.type}</td>
                      <td>
                        <span className="admin-published-status">
                          <span />
                          {property.status}
                        </span>
                      </td>
                      <td>
                        <Link
                          href="/admin/properties"
                          className="admin-row-action"
                          aria-label={`Manage ${property.name}`}
                        >
                          <ArrowUpRight size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="admin-footer">
            <span>TERRAVISTA ADMINISTRATION</span>
            <span>PROPERTY MANAGEMENT WORKSPACE</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
