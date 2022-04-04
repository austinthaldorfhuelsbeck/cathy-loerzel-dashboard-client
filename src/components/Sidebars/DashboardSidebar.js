export default function DashboardSidebar() {
    const navItems = [
        {
            title: "Dashboard",
            href: "/"
        },
        {
            title: "All Blogs",
            href: "/blogs"
        },
        {
            title: "All Events",
            href: "/events"
        }
    ];

    const createItems = [
        {
            title: "New Blog",
            href: "/blogs/new"
        },
        {
            title: "New Event",
            href: "/events/new"
        }
    ]
    
    const renderNavList = (items) => (
        items.map((item) => (
            <li className="nav-item">
                <a className="nav-link" href={item.href}>{item.title}</a>
            </li>
        ))
    );

    const renderNavSection = (title, items) => (
        <>
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">{title}</h6>
            <ul className="nav flex-column">{renderNavList(items)}</ul>
        </>
    )

    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
            {renderNavSection("View", navItems)}
            {renderNavSection("Create", createItems)}
        </div>
      </nav>
    );
  }