export default function DashboardHeader({ title, content }) {
  return (
    <header className="jumbotron bg-dark">
      <div className="container text-white">
        <h1 className="display-4">{title}</h1>
        <p className="lead">{content}</p>
      </div>
    </header>
  )
}
