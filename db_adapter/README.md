# Sqlite
You need the sqlx CLI:

```
cargo install sqlx-cli --no-default-features --features rustls,sqlite
```

## Notes
- This approach is probably kind of slow!
   - sqlx uses async, but sqlite is not async. Result is 7-70x slower than Diesel according to the Diesel maintainer (still plenty fast)
   - I assume there's copies between Rust & JS