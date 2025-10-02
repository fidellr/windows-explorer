#!/bin/bash
set -e

# ====== CONFIG ======
DB_NAME="win_explorer_db"
DB_USER="postgres"   # change if needed
DB_PASS="postgres"   # change if needed
DB_HOST="localhost"
DB_PORT="5432"
SQL_DIR="explorer-backend/sql"

# ====== FUNCTIONS ======

create_db() {
  echo "📦 Creating database '$DB_NAME' (if not exists)..."
  psql -h $DB_HOST -p $DB_PORT -U $DB_USER -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
  psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE $DB_NAME;"
}

run_sql_files() {
  echo "🗄️ Running schema + seed files..."
  
  if [ -f "$SQL_DIR/schema.sql" ]; then
    echo "➡️ Executing schema.sql..."
    psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$SQL_DIR/schema.sql"
  else
    echo "⚠️ schema.sql not found in $SQL_DIR"
  fi

  if [ -f "$SQL_DIR/seed.sql" ]; then
    echo "➡️ Executing seed.sql..."
    psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$SQL_DIR/seed.sql"
  else
    echo "⚠️ seed.sql not found in $SQL_DIR"
  fi
}

# ====== MAIN ======
echo "=============================="
echo " Win Explorer DB Setup"
echo "=============================="

create_db
run_sql_files

echo "✅ Database setup complete!"
