#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

pub mod types;

use std::str::FromStr;

use napi::{Error, Result};
use sqlx::{sqlite::SqliteConnectOptions, ConnectOptions, SqliteConnection};
use types::User;

macro_rules! throw_to_js_custom {
  ($expr:expr, $err:expr) => {{
    match ($expr) {
      Ok(v) => v,
      Err(e) => return Err(Error::from_reason($err(e))),
    }
  }};
}

macro_rules! throw_to_js {
  ($expr:expr) => {{
    throw_to_js_custom!($expr, |e| format!("{}", e))
  }};
  ($expr:expr, $err:expr) => {{
    throw_to_js_custom!($expr, |e| format!("{}: {}", $err, e))
  }};
}

#[napi]
pub struct JsHandle {
  conn: SqliteConnection,
}

#[napi]
impl JsHandle {
  #[napi]
  pub async fn get_user_from_google_identity(&mut self, sub: String) -> Result<Option<User>> {
    let user = throw_to_js!(
      sqlx::query_as!(
        User,
        r#"SELECT Users.id FROM Users 
           INNER JOIN GoogleIdentity ON Users.id=GoogleIdentity.user_id
           WHERE Users.id = ?
           LIMIT 1;"#,
        sub
      )
      .fetch_optional(&mut self.conn)
      .await
    );
    Ok(user)
  }
}

#[napi]
pub async fn create_connection(url: String) -> Result<JsHandle> {
  let conn = throw_to_js_custom!(
    throw_to_js!(
      SqliteConnectOptions::from_str(&url),
      format!("Invalid connection string ({})", url)
    )
    .create_if_missing(true)
    // for litestream
    .journal_mode(sqlx::sqlite::SqliteJournalMode::Wal)
    .connect()
    .await,
    |e| format!("Failed to connect: {}", e)
  );
  Ok(JsHandle { conn })
}
