// use ts_rs::TS;

// #[derive(TS)]
// #[ts(export)]
#[derive(sqlx::FromRow)]
#[napi]
pub struct User {
  pub id: String,
}

pub struct GoogleIdentity {
  // Identity Mixin
  user_id: String,
  // End Identity Mixin
  sub: String,
  displayName: String,
  email: String,
}
