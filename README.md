# 🌟 **Naming Conventions**

## 1. 🖋️ **CamelCase** for Components or Screens

- Use **PascalCase** (capitalize the first letter of each word) for component or screen files.
- **Examples:**
  - `LoginScreen.js`
  - `UserProfileCard.js`

## 2. 🛠️ **Kebab-case** for Utility Files

- Use **kebab-case** (lowercase words separated by hyphens) for utility or module files.
- **Examples:**
  - `date-utils.js`
  - `api-client.js`

---

# 🗂️ **Expo File-based Routing**

Expo uses **file-based routing**, where the file structure determines the URL routing of the app. This simplifies navigation by automatically generating routes based on your file hierarchy.

- **Further Reading:** [📖 official Expo documentation on file-based routing](https://docs.expo.dev/develop/file-based-routing/).

---

# 🚀 **Git Workflow Guidelines**

## 3. **Branch Naming Convention**

### 3.1. **Format**

- Use a prefix to indicate the type of work, followed by a brief, descriptive name.
- **Format:** `{type}/#<issue_number>-{description}`
  - `{type}`: Nature of the branch (e.g., feature, bug, hotfix, etc.).
  - `{description}`: A concise description of the task or issue.
  - `{#issue_number}`: Task number on Jira/Trello.

### 3.2. **Examples:**

```bash
📂 git checkout -b feature/add-login-button
🐛 git checkout -b bug/fix-header-overlap
⚡ git checkout -b hotfix/critical-issue-123
```

### 3.3. 📌 **Branch Type Reference**

| **Branch Type** | **Purpose**                                                         |
| --------------- | ------------------------------------------------------------------- |
| **feature** ✨  | For adding new features or functionality.                           |
| **bug** 🐛      | For fixing bugs or issues.                                          |
| **hotfix** 🚑   | For critical fixes that must be resolved immediately.               |
| **release** 🚀  | For preparing a release with tested and finalized features.         |
| **chore** 🧹    | For maintenance tasks such as dependency updates.                   |
| **modify** 🛠️   | For minor adjustments, tweaks, or refactoring without new features. |

---

## 4. 📝 **Commit Message Convention**

### 4.1. **Format:**

```bash
{type}: {subject}
```

- **`type`**: Purpose of the commit (see the table below for types).
- **`subject`**: A brief, imperative description of what the commit does.

### 4.2. **Examples:**

```bash
✨ git commit -m "feat: add login button"
🐛 git commit -m "fix: resolve header overlap issue"
📚 git commit -m "docs: update README with contributing guidelines"
```

### 4.3. **Commit Types:**

| **Type**        | **Description**                                                                     |
| --------------- | ----------------------------------------------------------------------------------- |
| **feat** ✨     | Introduces a new feature or functionality.                                          |
| **fix** 🐛      | Fixes a bug in the application.                                                     |
| **docs** 📚     | Documentation updates or improvements (e.g., README, comments, etc.).               |
| **style** 🎨    | Code changes that do not affect functionality (e.g., formatting, lint fixes).       |
| **refactor** 🔄 | Code changes that neither add functionality nor fix bugs.                           |
| **perf** ⚡     | Improves performance without changing functionality.                                |
| **test** 🧪     | Adds new tests or fixes existing ones.                                              |
| **build** 🏗️    | Changes to the build process or dependencies (e.g., npm, Webpack).                  |
| **ci** 🔧       | Changes to CI/CD configurations and scripts.                                        |
| **chore** 🧹    | Routine tasks or updates that don't affect the codebase (e.g., dependency updates). |
| **revert** ⏪   | Reverts a previous commit.                                                          |
| **hotfix** 🚑   | Critical fixes that need to be deployed immediately.                                |

---

## 5. 🌿 **Branch Management**

### 5.1. **Workflow:**

1. Always work on a new branch based on the task or feature.
2. Regularly pull updates from the main branch to avoid merge conflicts.
3. Use pull requests (PRs) for code reviews before merging.

---

## 6. 📤 **Push Workflow**

### 6.1. **Steps:**

1. Create a branch based on the feature or issue you're working on:
   ```bash
   🌱 git checkout -b {type}/{description}
   ```
2. Make and stage your changes:
   ```bash
   ➕ git add .
   ```
3. Commit your changes with a meaningful message:
   ```bash
   🖋️ git commit -m "{type}: {subject}"
   ```
4. Push your branch to the remote repository:
   ```bash
   🚀 git push origin {type}/{description}
   ```

### 6.2. **Example:**

```bash
🌱 git checkout -b feature/user-authentication
➕ git add .
🖋️ git commit -m "feat: implement user authentication flow"
🚀 git push origin feature/user-authentication
```

---

# 🌳 **Git Flow**

Git Flow introduces a robust branching model for project development. Below is the structure and workflow for managing branches like `main`, `develop`, `release`, and `hotfix`.

## 7.1. **Branching Model Overview**

![Git Flow Model](https://media.licdn.com/dms/image/v2/D4E22AQFv9-n24c-x0A/feedshare-shrink_800/feedshare-shrink_800/0/1708786844976?e=2147483647&v=beta&t=DZ7YCMW3f5orafrSi1CXZLEB3J_YfZaWe2Gpnb0jigI)

### 7.2. **Branch Definitions**

| **Branch**  | **Purpose**                                                                |
| ----------- | -------------------------------------------------------------------------- |
| **main**    | Contains production-ready code. Reflects what is currently live.           |
| **develop** | Holds the latest code under development. Acts as an integration branch.    |
| **feature** | Branch off `develop` to work on individual features.                       |
| **release** | Prepare code for production. Merge back into `main` and `develop`.         |
| **hotfix**  | For urgent fixes directly on `main`. Merge into both `main` and `develop`. |

### 7.3. **Workflow Steps**

#### 1. **Starting a Feature**

- Branch from `develop`:
  ```bash
  git checkout develop
  git checkout -b feature/{feature-name}
  ```

#### 2. **Finishing a Feature**

- Merge into `develop`:
  ```bash
  git checkout develop
  git merge feature/{feature-name}
  git branch -d feature/{feature-name}
  ```

#### 3. **Preparing a Release**

- Branch from `develop`:
  ```bash
  git checkout develop
  git checkout -b release/{version}
  ```
- Test and fix issues.
- Merge into `main` and tag the release:
  ```bash
  git checkout main
  git merge release/{version}
  git tag -a v{version} -m "Release {version}"
  ```
- Merge back into `develop`:
  ```bash
  git checkout develop
  git merge release/{version}
  git branch -d release/{version}
  ```

#### 4. **Hotfixing**

- Branch from `main`:
  ```bash
  git checkout main
  git checkout -b hotfix/{issue-name}
  ```
- Fix the issue and merge into both `main` and `develop`:

  ```bash
  git checkout main
  git merge hotfix/{issue-name}
  git tag -a v{hotfix-version} -m "Hotfix {issue-name}"

  git checkout develop
  git merge hotfix/{issue-name}
  git branch -d hotfix/{issue-name}
  ```
