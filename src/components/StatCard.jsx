function StatCard({ title, value, description, icon: Icon, type }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${type}`}>
        <Icon size={23} />
      </div>

      <div className="stat-content">
        <span className="stat-title">{title}</span>

        <strong className="stat-value">{value}</strong>

        <span className="stat-description">{description}</span>
      </div>
    </div>
  );
}

export default StatCard;