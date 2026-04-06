// Nova Analytics — existing data models
// These are already in production. New schema must coexist with these.

const UserModel = {
  table: 'users',
  columns: {
    id: 'uuid PRIMARY KEY',
    email: 'varchar(255) UNIQUE NOT NULL',
    plan: "varchar(50) DEFAULT 'free'",   // free | starter | pro
    created_at: 'timestamp DEFAULT now()',
    last_seen: 'timestamp'
  }
};

const DashboardModel = {
  table: 'dashboards',
  columns: {
    id: 'uuid PRIMARY KEY',
    user_id: 'uuid REFERENCES users(id)',
    name: 'varchar(255)',
    created_at: 'timestamp DEFAULT now()',
    updated_at: 'timestamp DEFAULT now()'
  }
};

const DataSourceModel = {
  table: 'data_sources',
  columns: {
    id: 'uuid PRIMARY KEY',
    user_id: 'uuid REFERENCES users(id)',
    type: "varchar(50)",   // csv | api | database
    name: 'varchar(255)',
    connected_at: 'timestamp DEFAULT now()'
  }
};

module.exports = { UserModel, DashboardModel, DataSourceModel };
