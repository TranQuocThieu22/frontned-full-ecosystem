# AQCoreFE

This repo is maintained by the AQNew team.

<br>

# What's inside?

This monorepo includes the following packages/apps:

### Packages
- `@aq-fe/core-ui`: UI library shared by all AQ web applications
- `@aq-fe-framework`: Unmaintained UI library shared by all AQ web applications
- `@aq-fe/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@aq-fe/typescript-config`: `tsconfig.json`s shared throughout the monorepo

### Apps
- `base-app`: Project template - Project mẫu
- `apm`: Authoring Process Management - Quản lý Quy trình Biên soạn
- `asm`: Asset Management System - Quản lý Tài sản - Thiết bị - Vật tư
- `college`: No title - Chưa đặt tên
- `eaq`: Evidence for Accreditation and Quality Control - Quản lý minh chứng và hỗ trợ báo cáo kiểm định
- `icm`: International Cooperation Management - Quản lý Hợp tác Quốc tế
- `ipm`: Intellectual Property Management - Quản lý sở hữu trí tuệ
- `lom`: Curriculum Outcome Evaluation - Quản lý chuẩn đầu ra
- `qmes`: Quản lý đo lường và đánh giá tiêu chuẩn cơ sở giáo dục
- `sae`: Student Activity Evaluation - Phần mềm trực tuyến quản lý hoạt động ngoại khóa và điểm rèn luyện
- `school`: No title - Chưa đặt tên
- `scm`: Scientific Conference Management - Quản lý Hội thảo Khoa học
- `srm`: Science Research Management - Quản lý nghiên cứu khoa học
- `stm-u`: Short term training Management (Upskill) - Quản lý đào tạo ngắn hạn (STM-U)
- `stm-g`: STM-G: K12 Growth - Quản lý đào tạo ngắn hạn (STM-G)
- `svn`: Survey Versatility & Navigation - Phần mềm khảo sát đánh giá

<br>

# Develop

Step 1: Install package manager `pnpm` using npm.
```
npm install -g pnpm@10.14.0
```

Step 2: Install dependencies in all projects.

```
pnpm i
```

Step 3: Install `Turbo` CLI globally

```
pnpm add turbo --global
```

Start develop: To develop all apps and packages, run the following command:

```
pnpm exec turbo dev
```

To run a specific project, using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
pnpm exec turbo dev --filter=base-app
```
Or

```
turbo dev --filter base-app
```

> **_NOTE:_**
> The package `@aq-fe/core-ui` does not have run dev script. You would need to run the app `base-app` to explore the package `@aq-fe/core-ui`.

<br>

# Build  

To build all apps and packages, run the following command:

```
pnpm exec turbo build
```
Or
```
turbo build
```
<br>

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
pnpm exec turbo build --filter base-app
```
Or

```
turbo build --filter base-app
```

<br>

# Using --filter

### Basic

You can use `--filter` or `-F` to specify project for the task in your CLI command.
<br>

Example: Run the `dev` task for the `base-app` project.
```
turbo dev --filter base-app
pnpm run dev --filter base-app
```
Or
```
turbo dev -F base-app 
pnpm run dev --F base-app
```
<br>

You can also filter to a specific task for the package directly in your CLI command without needing to use `--filter` or `-F` .
<br>

Example 1: Run the `build` task for the `base-app` project.
```
turbo run base-app#build
```
Example 2: Run the `build` task for the `base-app` project, and the `lint` task for the `sae` project.
```
turbo run base-app#build sae#lint
```
<br>

### Filtering to include dependents
When you're working on a specific package, you might want to run tasks for the package and its dependents. The `...` microsyntax is useful when you're making changes to a package and want to ensure that the changes don't break any of its dependents.
```
turbo build --filter=...@aq-fe/core-ui
```
<br>

### Filtering to include dependencies
To limit the scope to a package and its dependencies, append `...` to the package name. This runs the task for the specified package and all packages it depends on.
```
turbo dev --filter=base-app...
```
<br>

# Install dependencies
### Install dependencies
```
pnpm i
```
> **_NOTE:_**
> It is not possible to run `pnpm i` for each project using `--filter`. Always run `pnpm i` to install dependencies in the package.json. This command will install all dependencies for all projects, this is normal, don't worry. To install specific package for specific project, see instruction for using `add` below.

<br>

### Add new dependencies to projects
Method 1: Use `add` to install new package for project.

Example 1: Single project
```
pnpm add react@19.1.1 -r --filter=base-app
```
Example 2: Multiple projects
```
pnpm add react@19.1.1 -r --filter=base-app --filter=@aq-fe/core-ui --filter=sae
```
Example 3: All projects
```
pnpm add react@19.1.1 -r
```
<br>

Method 2: You can specify package and its version in the package.json file. Then run `pnpm i` , it will work the same.

> **_EXPLAIN:_** Updating all package.json files in Method 2 and using `-r` in Method 1 ensure consistency for the lockfile of the monorepo.

<br>

### Update dependency version
Method 1
```
pnpm up -r typescript@latest
```
<br>

Method 2

Replace the version of a dependency across all package.json files of all projects, then run `pnpm i`. 
> **_EXPLAIN:_** Updating all package.json files in Method 2 and using `-r` in Method 1 ensure consistency for the lockfile of the monorepo.
<br />

## Useful Links

Learn more about the Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)

<br>
Learn more about the pnpm:

- [pnpm --recursive](https://pnpm.io/cli/recursive)
