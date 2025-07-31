# Page snapshot

```yaml
- navigation:
  - img "Resetrix"
  - link "Sign in":
    - /url: /signin
- main:
  - heading "Sign in to your account" [level=2]
  - text: Username or Email
  - textbox "Username or Email": test@resetrix.com
  - text: Password
  - textbox "Password": password123
  - alert:
    - heading "Invalid username/email or password. Please try again." [level=3]
  - button "Sign in"
- alert
- button "Open Next.js Dev Tools":
  - img
```