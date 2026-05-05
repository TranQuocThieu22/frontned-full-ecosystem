SRS – HỆ THỐNG

IAM Platform & FE-Admin IAM

(Tài liệu đặc tả phần mềm

Hệ thống SAE – IAM)

# 1\. Giới thiệu

## 1.1. Mục đích tài liệu

Tài liệu **Software Requirements Specification (SRS)** này mô tả **đầy đủ và chính xác** các yêu cầu nghiệp vụ, yêu cầu chức năng và phi chức năng của **IAM Platform & FE-Admin IAM** trong hệ thống **SAE – Student Activity Evaluation** của Trường Đại học Ngoại thương.

Tài liệu được sử dụng làm căn cứ chính thức cho:

*   Thiết kế giải pháp kỹ thuật chi tiết (**Solution Design / SSD**)
*   Phát triển **IAM Platform**, **Backend Services**, **BFF**, **FE-Admin IAM**
*   Kiểm thử hệ thống (**System Test, Integration Test, UAT**)
*   Nghiệm thu, kiểm toán bảo mật và tuân thủ (**Security Audit, Compliance**)
*   Làm cơ sở đối soát yêu cầu giữa **BRD – FRD – SSD**

SRS đóng vai trò là **Single Source of Truth** cho toàn bộ yêu cầu của phân hệ IAM.

## 1.2. Phạm vi tài liệu

Tài liệu này bao phủ toàn bộ yêu cầu đối với:

*   **IAM Platform** (microservice trung tâm)
*   **FE-Admin IAM** (ứng dụng quản trị định danh & phân quyền)

Phạm vi nội dung bao gồm:

*   Quản lý **Identity lifecycle** (User, Role, Permission, Policy)
*   Xác thực (**Authentication**) và cấp phát Token
*   Phân quyền & kiểm soát truy cập (**Authorization**) theo mô hình **RBAC + ABAC**
*   Quản lý Token, Session, Logout, Token Revocation
*   Audit Log, Authorization Log
*   Tích hợp với các hệ thống khác trong SAE và hệ thống bên ngoài

Các nội dung **không thuộc phạm vi tài liệu**:

*   Logic nghiệp vụ đánh giá điểm rèn luyện (ĐRL)
*   Quản lý hoạt động ngoại khóa, hoạt động cộng đồng
*   Chức năng frontend nghiệp vụ ngoài FE-Admin IAM

## 1.3. Phạm vi hệ thống

**IAM Platform** là nền tảng trung tâm quản lý:

*   Định danh (Identity)
*   Xác thực (Authentication)
*   Phân quyền (Authorization)
*   Kiểm soát truy cập (Access Control)

cho **toàn bộ hệ thống SAE**, được thiết kế theo:

*   **Kiến trúc Microservice**
*   **Mô hình Zero Trust**
*   **Multi-tenant** (phù hợp cấu trúc tổ chức FTU)

IAM Platform **không xử lý nghiệp vụ SAE**, mà đóng vai trò **dịch vụ nền tảng dùng chung** cho tất cả phân hệ.

## 1.4. Đối tượng sử dụng tài liệu

Tài liệu này được biên soạn cho các đối tượng sau:

*   **Ban chỉ đạo dự án / Chủ đầu tư**
*   **Business Analyst (BA)**
*   **Solution Architect / System Architect**
*   **Backend / Frontend Developers**
*   **DevOps / Infra / Security Team**
*   **QA / Tester / UAT Team**
*   **Auditor / Security Reviewer**

Người đọc được giả định có kiến thức cơ bản về:

*   Kiến trúc hệ thống thông tin
*   Microservice
*   OAuth2 / OIDC / JWT
*   Các khái niệm bảo mật cơ bản

**1.5. Định nghĩa, thuật ngữ và viết tắt (Definitions, Acronyms, Abbreviations)**

#

Thuật ngữ

Mô tả

1

SAE

Student Activity Evaluation – Hệ thống Quản lý Hoạt động Ngoại khóa & Đánh giá rèn luyện

2

IAM

Identity & Access Management

3

IdP

Identity Provider

4

RBAC

Role-Based Access Control

5

ABAC

Attribute-Based Access Control

6

PDP

Policy Decision Point

7

JWT

JSON Web Token

8

Zero Trust

Mô hình bảo mật “không tin cậy mặc định”

9

Tenant

Đơn vị tổ chức logic trong hệ thống (VD: Khoa, Trung tâm)

10

FE-Admin IAM

Ứng dụng giao diện quản trị IAM

(Danh sách đầy đủ sẽ được mở rộng trong **Phụ lục**)

**1.6. Tài liệu tham chiếu (References)**

Các tài liệu liên quan được sử dụng làm đầu vào cho SRS này:

*   **BRD\_FTU\_SAE\_v1.1\_260126.docx** – Tài liệu yêu cầu nghiệp vụ hệ thống SAE
*   **FRD\_SAE26\_IAM\_v1.1.docx** – Tài liệu yêu cầu chức năng IAM Service
*   **SSD\_DAV\_SAE-IAM\_v1.0\_260126\_1330.docx** – Solution Design Document IAM
*   Các tiêu chuẩn và best practices:
    *   OAuth 2.0 / OpenID Connect
    *   OWASP ASVS
    *   ISO/IEC 27001
    *   NIST Zero Trust Architecture

**1.7. Tổng quan tài liệu (Document Overview)**

Cấu trúc tổng thể của tài liệu SRS gồm:

*   **Phần 1**: Giới thiệu (tài liệu, phạm vi, thuật ngữ)
*   **Phần 2**: Tổng quan hệ thống IAM
*   **Phần 3**: Các yêu cầu chức năng
*   **Phần 4**: Các yêu cầu phi chức năng
*   **Phần 5**: Yêu cầu giao diện & dữ liệu
*   **Phần 6**: Yêu cầu tích hợp
*   **Phần 7**: Yêu cầu kiểm thử & nghiệm thu
*   **Phần 8**: Phụ lục

# **2\. Tổng quan hệ thống**

## 2.1. Bối cảnh hệ thống

**SAE – Student Activity Evaluation** là **nền tảng SaaS (Software as a Service)** cung cấp dịch vụ quản lý:

*   Hoạt động ngoại khóa (HĐNK)
*   Hoạt động cộng đồng (HĐCĐ)
*   Đánh giá điểm rèn luyện sinh viên (ĐRL)

cho **nhiều cơ sở giáo dục đại học** trên cùng một hạ tầng dùng chung.

Hệ thống được thiết kế theo mô hình **multi‑tenant**, trong đó:

*   **Mỗi Trường/Đơn vị giáo dục = một Tenant độc lập**
*   Dữ liệu, người dùng, chính sách phân quyền được **cách ly logic tuyệt đối** giữa các tenant

Trong kiến trúc SAE SaaS, **IAM Platform** là **dịch vụ nền tảng trung tâm**, chịu trách nhiệm:

*   Quản lý định danh và vòng đời người dùng
*   Xác thực, phân quyền và kiểm soát truy cập
*   Đảm bảo tuân thủ mô hình **Zero Trust** cho toàn bộ hệ sinh thái SAE

IAM Platform **không xử lý nghiệp vụ đặc thù của từng Trường**, mà cung cấp **năng lực bảo mật – định danh dùng chung**, có thể cấu hình linh hoạt theo từng tenant.

## 2.2. Sơ đồ kiến trúc

### 2.2.1. Sơ đồ kiến trúc nghiệp vụ

![]()

Hệ thống IAM được thiết kế theo các nguyên lý:

*   **SaaS Multi‑Tenant Architecture**
*   **Microservice‑based Architecture**
*   **Zero Trust Security Model**
*   **Cloud‑ready & Horizontally Scalable**

**Các thành phần chính:**

1.  **Identity Provider (IdP)**
    *   Có thể là **Keycloak (default)** hoặc IdP riêng của từng Trường
    *   Hỗ trợ OIDC / OAuth2 / SAML
    *   Có thể cấu hình **IdP per tenant**
2.  **IAM Platform (Core IAM Services)**
    *   Quản lý:
        *   Tenant
        *   User
        *   Role
        *   Permission
        *   Policy
    *   Thực hiện:
        *   Authorization (RBAC + ABAC)
        *   Policy Decision Point (PDP)
        *   Token Revocation & Session Control
    *   Đảm bảo **tenant isolation** ở mọi lớp
3.  **FE‑Admin IAM (SaaS Admin Console)**
    *   Quản trị **toàn hệ thống SaaS** (Super Admin)
    *   Quản trị **từng tenant** (Tenant Admin)
    *   Cấu hình:
        *   IdP
        *   Role model
        *   Authorization policy
        *   Security policy theo từng Trường
4.  **BFF / API Gateway**
    *   Là điểm kiểm soát Zero Trust bắt buộc
    *   Xác thực token
    *   Enforce authorization policy
    *   Gắn context tenant cho mọi request
5.  **Các Microservice SAE**
    *   HĐNK Service
    *   HĐCĐ Service
    *   ĐRL Service
    *   Các dịch vụ mở rộng khác
    *   Tất cả đều **không trust request**, chỉ tin IAM context

### 2.2.2. Sơ đồ chức năng của Web app FE-Admin IAM

![]()

Luồng giao tiếp chuẩn của Web app FE-Admin IAM được thiết kế như sau:

FE-Admin IAM

↓

API Gateway

↓

Admin BFF

↓

IAM Core Services

Trong đó:

*   **API Gateway** là điểm vào duy nhất từ frontend, chịu trách nhiệm xác thực OIDC/JWT, kiểm soát bảo mật mạng, rate limit và correlation ID.
*   **Admin BFF** thực hiện orchestration, chuẩn hóa dữ liệu cho FE-Admin và không quyết định phân quyền.
*   **IAM Core Services** là nơi quyết định phân quyền cuối cùng theo RBAC + ABAC.

Thiết kế này đảm bảo nguyên tắc **Zero Trust**, tách biệt trách nhiệm và hỗ trợ audit, SOC.

Phân hệ FE-Admin IAM là một Web Application phục vụ quản trị phân quyền, hoạt động độc lập với hệ thống nghiệp vụ, nhưng tuân thủ đầy đủ cơ chế IAM, Audit và Forensic của nền tảng SAE SaaS.

*   **Quản lý Tổ chức:**
    *   Xem danh sách tenant trong hệ thống
    *   Xem chi tiết thông tin tenant
    *   Cập nhật cấu hình tenant
    *   Quản lý trạng thái hoạt động của tenant
*   **Quản lý Người dùng:**
    *   Xem danh sách user theo tenant
    *   Xem thông tin chi tiết user
    *   Gán / thu hồi role cho user
    *   Kích hoạt / vô hiệu hóa user
    *   Xem trạng thái và metadata liên quan đến IAM
*   **Quản lý Vai trò và Quyền truy cập:**
    *   Xem danh sách role
    *   Xem chi tiết role
    *   Tạo mới role (tenant level)
    *   Cập nhật permission cho role
    *   Gán role cho user (liên kết với 3.2)
    *   Kích hoạt / vô hiệu hóa role
*   **Quản lý Phạm vi dữ liệu:**
    *   Xem danh sách Scope
    *   Tạo mới / cập nhật Scope
    *   Kích hoạt / vô hiệu hóa Scope
    *   Gán Scope cho User
    *   Gán Scope cho Role
    *   Xem Scope đang áp dụng cho User / Role
*   **Giám sát hoạt động Phân quyền:**
    *   Xem danh sách authorization log
    *   Xem chi tiết từng quyết định authorize
    *   Lọc, tìm kiếm theo nhiều tiêu chí
    *   Phân tích nguyên nhân ALLOW / DENY
    *   Phát hiện xu hướng bất thường (read only)
*   **Kiểm toán và Truy vết dữ liệu**
    *   **Xem danh sách authorization log**
    *   **Xem chi tiết từng quyết định authorize**
    *   **Lọc, tìm kiếm theo nhiều tiêu chí**
    *   **Phân tích nguyên nhân ALLOW / DENY**
    *   **Phát hiện xu hướng bất thường (read only)**
*   **Hệ thống và Bảo mật**
    *   a) System Configuration
        *   Cấu hình toàn cục IAM
        *   Cấu hình theo tenant
        *   Feature flags
        *   Rate limit / throttling
        *   Session & token policy
    *   b) Security Configuration
        *   Password / credential policy
        *   MFA / step up authentication
        *   IP allowlist / blocklist
        *   Client / integration security
        *   API security controls
    *   c) Security Monitoring
        *   Phát hiện hành vi bất thường
        *   Theo dõi security events
        *   Phát hiện brute force / abuse
        *   Theo dõi health & integrity

### 2.2.3. IAM Platform - Nghiệp vụ theo từng Layer

Nội dung này mô tả **trách nhiệm nghiệp vụ (Business Responsibility)** của từng **Layer kiến trúc** trong Phân hệ **Identity & Access Management (IAM)** của hệ thống SAE, nhằm:

*   Làm rõ **ai chịu trách nhiệm nghiệp vụ gì**
*   Tránh **chồng chéo vai trò** giữa Gateway, BFF, IAM và Business Service
*   Làm cơ sở cho:
    *   Thiết kế kiến trúc (SSD)
    *   Đánh giá bảo mật (Security Review)
    *   Kiểm toán & tuân thủ (Audit / Compliance)

Chương này **không mô tả chi tiết kỹ thuật triển khai**, mà tập trung vào **trách nhiệm nghiệp vụ và ranh giới chức năng**.

#### 2.2.3.1 Tổng quan phân lớp kiến trúc

Phân hệ IAM được tổ chức theo mô hình phân lớp (layered architecture) như sau:

**Presentation Layer**

**↓**

**Edge Layer (API Gateway)**

**↓**

**Application Layer (BFF)**

**↓**

**IAM Core Layer (Authorization Domain – PDP)**

**↓**

**Business Services Layer (PEP – Execution)**

**↓**

**Audit & Compliance Layer**

Mỗi layer có **trách nhiệm nghiệp vụ riêng biệt**, không thay thế hoặc lấn vai trò của layer khác.

#### 2.2.3.2 Presentation Layer

##### Thành phần

*   FE User (Student / Staff)
*   FE‑Admin IAM

##### Trách nhiệm nghiệp vụ

Presentation Layer chịu trách nhiệm:

*   Cung cấp **giao diện người dùng** cho:
    *   Người dùng cuối (Student, Staff)
    *   Quản trị viên IAM
*   Thu thập dữ liệu đầu vào (input)
*   Hiển thị dữ liệu đầu ra (output)
*   Gửi yêu cầu (request) đến hệ thống backend

##### Phạm vi nghiệp vụ

*   Đăng nhập (SSO flow ở mức UI)
*   Thao tác nghiệp vụ theo vai trò người dùng
*   Quản trị tenant, user, role, scope (đối với FE‑Admin IAM)
*   Tra cứu audit log (theo phân quyền được cấp)

##### Ngoài phạm vi

Presentation Layer **KHÔNG**:

*   Xác thực credential
*   Đánh giá quyền truy cập
*   Hiểu hoặc áp dụng RBAC / ABAC
*   Quyết định ALLOW / DENY

#### 2.2.3.3 Edge Layer – API Gateway (ví dụ: Kong)

##### Trách nhiệm nghiệp vụ

Edge Layer đóng vai trò **cổng bảo vệ biên hệ thống (Edge Security Gate)**, chịu trách nhiệm:

*   Bảo vệ hệ thống khỏi truy cập trái phép ở mức hạ tầng
*   Kiểm soát lưu lượng và truy cập kỹ thuật

##### Phạm vi nghiệp vụ

*   TLS termination
*   JWT signature verification
*   Token expiration check
*   Rate limiting
*   IP filtering / CORS
*   Routing request đến BFF

##### Nguyên tắc quan trọng

API Gateway:

*   **KHÔNG hiểu nghiệp vụ**
*   **KHÔNG biết resource hoặc action**
*   **KHÔNG gọi IAM để xin quyết định quyền**
*   **KHÔNG thực hiện RBAC / ABAC**

API Gateway **không phải** Authorization Engine
API Gateway **không phải** Policy Decision Point (PDP)

#### 2.2.3.4 Application Layer – BFF (Backend for Frontend)

##### Trách nhiệm nghiệp vụ

BFF là **Policy Enforcement Point (PEP) ở mức nghiệp vụ**, chịu trách nhiệm:

*   Xử lý request theo ngữ cảnh nghiệp vụ
*   Thực thi quyết định truy cập do IAM đưa ra
*   Điều phối (orchestrate) các service nghiệp vụ phía sau

##### Phạm vi nghiệp vụ

*   Nhận request từ FE (qua Gateway)
*   Trích xuất context:
    *   User
    *   Tenant
    *   Resource
    *   Action
*   Gửi yêu cầu đánh giá quyền đến IAM (PDP)
*   Thực thi:
    *   ALLOW → tiếp tục xử lý
    *   DENY → trả lỗi chuẩn hoá
*   Orchestrate nhiều service nghiệp vụ
*   Ghi log nghiệp vụ (business-level logging)

##### Ngoài phạm vi

BFF **KHÔNG**:

*   Tự quyết định quyền truy cập
*   Lưu hoặc quản lý policy
*   Thay thế IAM
*   Đóng vai trò PDP

#### 2.2.3.5. IAM Core Layer – Authorization Domain (PDP)

##### Trách nhiệm nghiệp vụ

IAM Core là **trung tâm quyết định truy cập** của toàn hệ thống, đóng vai trò **Policy Decision Point (PDP)** duy nhất.

##### Phạm vi nghiệp vụ

*   Xác thực định danh thông qua tích hợp IdP (Keycloak)
*   Phát hành và quản lý JWT nghiệp vụ
*   Đánh giá quyền truy cập dựa trên:
    *   RBAC (Role‑Based Access Control)
    *   ABAC (Attribute‑Based Access Control)
    *   Tenant isolation
*   Quản lý token lifecycle:
    *   Issue
    *   Validate
    *   Revoke
*   Ghi nhận:
    *   Authorization log
    *   Identity & access audit log

##### Quy tắc nghiệp vụ cốt lõi

ALLOW =

Role match (RBAC)

AND Scope match (ABAC)

AND Tenant match

##### Ngoài phạm vi

IAM Core **KHÔNG**:

*   Thực thi nghiệp vụ domain (activity, DRL, report)
*   Trả dữ liệu nghiệp vụ
*   Thay thế Business Service

#### 2.2.3.6. Business Services Layer (Execution PEP)

##### Trách nhiệm nghiệp vụ

Business Services chịu trách nhiệm **thực thi nghiệp vụ domain** sau khi quyền truy cập đã được xác nhận.

##### Phạm vi nghiệp vụ

*   Quản lý hoạt động ngoại khóa
*   Tính điểm rèn luyện
*   Sinh báo cáo
*   Xử lý workflow nghiệp vụ

##### Ngoài phạm vi

Business Services **KHÔNG**:

*   Đánh giá RBAC / ABAC
*   Gọi IAM trực tiếp để xin quyền
*   Quyết định truy cập
*   Quản lý token

#### 2.2.3.7. Audit & Compliance Layer

##### Trách nhiệm nghiệp vụ

Audit & Compliance Layer chịu trách nhiệm:

*   Lưu trữ bằng chứng truy cập
*   Phục vụ kiểm toán, thanh tra, forensic investigation

##### Phạm vi nghiệp vụ

*   Lưu Authorization Log (ALLOW / DENY)
*   Lưu Audit / Forensic Log (identity, role, scope, tenant)
*   Cung cấp chức năng truy vấn cho Auditor (read‑only)
*   Đảm bảo:
    *   Append‑only
    *   Immutable
    *   Long‑term retention

##### Ngoài phạm vi

Audit Layer **KHÔNG**:

*   Can thiệp runtime
*   Chỉnh sửa hoặc xoá log
*   Quyết định truy cập

#### 2.2.3.8. Bảng tổng hợp trách nhiệm theo Layer

**#**

**Layer**

**Trách nhiệm nghiệp vụ chính**

**1**

Presentation

UI, nhập/xuất dữ liệu

**2**

API Gateway

Edge security, traffic control

**3**

BFF

Enforcement nghiệp vụ, orchestration

**4**

IAM Core

Quyết định truy cập (PDP)

**5**

Business Services

Thực thi nghiệp vụ

**6**

Audit Layer

Kiểm toán & tuân thủ

#### 2.2.3.9. Nguyên tắc kiến trúc cốt lõi

✅ Gateway bảo vệ biên
✅ BFF hiểu ngữ cảnh và thực thi
✅ IAM quyết định
✅ Service chỉ làm việc được phép

## 2.3. Các nhóm người dùng

**#**

**Nhóm người dùng**

**Mô tả**

**Phạm vi**

**1**

Super Admin (SaaS)

Quản trị toàn bộ nền tảng SAE

Cross‑tenant

**2**

Tenant Admin

Quản trị hệ thống SAE của một Trường

Single tenant

**3**

Cán bộ quản lý

Quản lý nghiệp vụ tại Trường

Theo khoa/đơn vị

**4**

Giảng viên / Cố vấn

Thực hiện đánh giá, xác nhận

Theo phân quyền

**5**

Sinh viên

Tham gia hoạt động, xem kết quả

Quyền tối thiểu

**6**

System Account

Tài khoản tích hợp hệ thống

Scoped access

Người dùng:

*   Có thể có **nhiều vai trò**
*   Luôn gắn với **ít nhất một tenant**
*   Mọi quyền truy cập đều được đánh giá **theo ngữ cảnh tenant**

## 2.4. Mục tiêu và chức năng tổng quát

IAM Platform SaaS cung cấp:

*   **Tenant Management**
    *   Tạo / cấu hình / khóa tenant
    *   Cấu hình IdP, policy, role model riêng
*   **Identity & Access Management**
    *   Quản lý vòng đời user theo tenant
    *   Federation với IdP của từng Trường
*   **Authentication**
    *   SSO
    *   MFA (tenant‑configurable)
    *   Token chuẩn OIDC
*   **Authorization**
    *   RBAC theo vai trò
    *   ABAC theo thuộc tính (tenant, faculty, position, time, resource)
    *   PDP đánh giá policy động
*   **Security & Compliance**
    *   Token revocation
    *   Session control
    *   Audit log theo tenant
    *   Phục vụ kiểm toán độc lập cho từng Trường

## 2.5. Nguyên tắc thiết kế và ràng buộc

**Nguyên tắc thiết kế:**

*   ✅ SaaS‑first, Tenant‑isolated
*   ✅ Zero Trust by default
*   ✅ Authentication ≠ Authorization
*   ✅ Policy‑driven & Configurable per tenant
*   ✅ Stateless & Cloud‑native

**Ràng buộc:**

*   Mọi request bắt buộc mang **tenant context**
*   Không chia sẻ dữ liệu cross‑tenant
*   Backend không tin frontend
*   Token không chứa thông tin nhạy cảm nghiệp vụ

## 2.6. Giả định và phụ thuộc (Assumptions & Dependencies)

**Giả định:**

*   Mỗi Trường chịu trách nhiệm dữ liệu người dùng của mình
*   Tenant có thể dùng IdP riêng hoặc IdP mặc định
*   Người dùng tuân thủ chính sách bảo mật của tenant

**Phụ thuộc:**

*   IdP của từng tenant
*   Hạ tầng cloud / container
*   Các microservice SAE tuân thủ chuẩn IAM SDK/API

## 2.7. Phạm vi trong và ngoài hệ thống

**Trong phạm vi:**

*   IAM SaaS Platform
*   FE‑Admin IAM
*   Multi‑tenant security
*   Audit & compliance theo tenant

**Ngoài phạm vi:**

*   Nghiệp vụ đặc thù từng Trường
*   Logic tính điểm rèn luyện
*   Nội dung hoạt động ngoại khóa

# 3\. Yêu cầu Chức năng IAM Platform

## 3.1. Phạm vi chức năng nghiệp vụ

### 3.1.1. Nguyên tắc mô tả

*   Bảng này mô tả **phạm vi chức năng nghiệp vụ** của Phân hệ IAM
*   Không mô tả chi tiết xử lý kỹ thuật
*   Mỗi chức năng là **đơn vị độc lập**, có thể:
    *   Phát triển
    *   Kiểm thử
    *   Audit

### 3.1.2. Bảng Xác định phạm vi chức năng – IAM Platform

![]()

#### 1️⃣ IDENTITY MANAGEMENT

**#**

**Mã**

**Nhóm**

**Chức năng**

**Mô tả ngắn**

**Ưu tiên**

**1**

IDM‑01

Tenant

Tenant Creation & Management

Tạo và quản lý tenant – security boundary

**Cao**

**2**

IDM‑02

Tenant

Activate / Suspend Tenant

Kích hoạt / khoá tenant

Cao

**3**

IDM‑03

Tenant

Tenant Configuration

Cấu hình cơ bản tenant

Trung bình

**4**

IDM‑04

Tenant

Tenant Isolation

Đảm bảo cách ly tenant

**Cao**

**5**

IDM‑05

User

Create / Update User

Tạo và cập nhật người dùng

**Cao**

**6**

IDM‑06

User

Sync User

Đồng bộ user từ hệ ngoài

Trung bình

**7**

IDM‑07

User

Activate / Suspend User

Kích hoạt / khoá user

**Cao**

**8**

IDM‑08

User

Bulk User Import

Import user hàng loạt

Thấp

**9**

IDM‑09

User

User Profile Management

Quản lý hồ sơ người dùng

Thấp

#### 2️⃣ AUTHENTICATION INTEGRATION

**#**

**Mã**

**Nhóm**

**Chức năng**

**Mô tả ngắn**

**Ưu tiên**

**1**

AUTHN‑01

IdP

IdP Integration

Kết nối IdP (OIDC/SAML)

**Cao**

**2**

AUTHN‑02

IdP

External IdP Mapping

Mapping user/claim từ IdP

Trung bình

**3**

AUTHN‑03

Login

SSO Login

Đăng nhập SSO

**Cao**

**4**

AUTHN‑04

Login

Logout

Đăng xuất

Cao

**5**

AUTHN‑05

Login

Session Termination

Kết thúc phiên từ AuthN

Trung bình

**6**

AUTHN‑06

Credential

Delegated Authentication

Xác thực uỷ quyền

Thấp

#### 3️⃣ TOKEN MANAGEMENT

**#**

**Mã**

**Nhóm**

**Chức năng**

**Mô tả ngắn**

**Ưu tiên**

**1**

TOK‑01

Issuance

Issue Access Token

Phát hành access token

**Cao**

**2**

TOK‑02

Issuance

Issue Refresh Token

Phát hành refresh token

Cao

**3**

TOK‑03

Validation

Signature Validation

Kiểm tra chữ ký token

**Cao**

**4**

TOK‑04

Validation

Expiration Check

Kiểm tra hết hạn

**Cao**

**5**

TOK‑05

Validation

Claim Validation

Kiểm tra claim

Cao

**6**

TOK‑06

Revocation

Logout Revoke

Thu hồi khi logout

Cao

**7**

TOK‑07

Revocation

Incident Revoke

Thu hồi khi sự cố

**Cao**

**8**

TOK‑08

Revocation

Admin Force Revoke

Thu hồi cưỡng bức

Trung bình

**9**

TOK‑09

Revocation

Token Blacklist

Danh sách token thu hồi

Trung bình

#### 4️⃣ SESSION MANAGEMENT

**#**

**Mã**

**Nhóm**

**Chức năng**

**Mô tả ngắn**

**Ưu tiên**

**1**

SES‑01

Lifecycle

Session Creation

Tạo session đăng nhập

**Cao**

**2**

SES‑02

Lifecycle

Session Expiration

Hết hạn session

**Cao**

**3**

SES‑03

Concurrent

Logout All Sessions

Đăng xuất toàn bộ session

Trung bình

**4**

SES‑04

Concurrent

Session Timeout Policy

Chính sách timeout

**Cao**

#### 5️⃣ AUTHORIZATION MANAGEMENT

**#**

**Mã**

**Nhóm**

**Chức năng**

**Mô tả ngắn**

**Ưu tiên**

**1**

AUTHZ‑01

Engine

Central PDP

Engine quyết định quyền

**Cao**

**2**

AUTHZ‑02

Engine

ALLOW / DENY Decision

Trả quyết định truy cập

**Cao**

**3**

AUTHZ‑03

Engine

Reason Code

Lý do deny

Trung bình

**4**

AUTHZ‑04

RBAC

System Role Management

Quản lý role hệ thống

Cao

**5**

AUTHZ‑05

RBAC

Custom Role Management

Quản lý role tuỳ chỉnh

Trung bình

**6**

AUTHZ‑06

RBAC

Role Assignment

Gán role cho user

**Cao**

**7**

AUTHZ‑07

RBAC

Permission Mapping

Map role–permission

**Cao**

**8**

AUTHZ‑08

ABAC

Scope Definition

Định nghĩa scope

Trung bình

**9**

AUTHZ‑09

ABAC

Attribute Management

Quản lý attribute

Trung bình

**10**

AUTHZ‑10

ABAC

Data Scope Evaluation

Đánh giá dữ liệu

Trung bình

**11**

AUTHZ‑11

Tenant

Tenant Context Validation

Kiểm tra tenant context

**Cao**

#### 6️⃣ INTEGRATION (IAM API)

**#**

**Mã**

**Nhóm**

**Chức năng**

**Mô tả ngắn**

**Ưu tiên**

**1**

INT‑01

IAM API

Authorization Check API

API kiểm tra quyền (PEP)

Cao

**2**

INT‑02

IAM API

Token Management API

API quản lý token

Cao

#### 7️⃣ MONITORING

**#**

**Mã**

**Nhóm**

**Chức năng**

**Mô tả ngắn**

**Ưu tiên**

**1**

INT‑03

Monitoring

Health Check

Kiểm tra tình trạng IAM

**Cao**

**2**

INT‑04

Monitoring

Performance Metrics

Theo dõi hiệu năng

Trung bình

#### 8️⃣ AUDIT & LOGGING

**#**

**Mã**

**Nhóm**

**Chức năng**

**Mô tả ngắn**

**Ưu tiên**

**1**

AUD‑01

AuthZ Log

ALLOW / DENY Logging

Log quyết định truy cập

**Cao**

**2**

AUD‑02

Security

Security Monitoring Log

Log phục vụ SOC

**Cao**

**3**

AUD‑03

Audit

Identity Change Log

Audit thay đổi user

**Cao**

**4**

AUD‑04

Audit

Role / Scope Change Log

Audit role/scope

**Cao**

**5**

AUD‑05

Audit

Tenant Config Log

Audit tenant

**Cao**

**6**

AUD‑06

Governance

Immutable Log

Log bất biến

**Cao**

**7**

AUD‑07

Governance

Long‑term Retention

Lưu trữ dài hạn

Trung bình

**8**

AUD‑08

Governance

Correlation Tracking

Truy vết end‑to‑end

**Cao**

#### 9️⃣ ADMIN / COMPLIANCE

**#**

**Mã**

**Nhóm**

**Chức năng**

**Mô tả ngắn**

**Ưu tiên**

**1**

ADM‑01

Config

Policy Configuration

Cấu hình policy

**Cao**

**2**

ADM‑02

Config

Token Policy

Cấu hình token

Cao

**3**

ADM‑03

Config

Session Policy

Cấu hình session

Cao

**4**

ADM‑04

Review

Role Review

Rà soát role

Trung bình

**5**

ADM‑05

Review

Scope Review

Rà soát scope

Trung bình

**6**

ADM‑06

Review

User Access Review

Rà soát truy cập

**Cao**

**7**

ADM‑07

Compliance

Audit Export

Xuất audit

Cao

**8**

ADM‑08

Compliance

Compliance Reporting

Báo cáo tuân thủ

**Cao**

**📌 TRACEABILITY MATRIX**

### 3.1.3. Bảng FE‑ADMIN WEB ↔ IAM FUNCTIONS

#### 1️⃣ Quản lý Tổ chức (Tenant Management)

**#**

**FE‑Admin Function**

**IDM**

**AUTHZ**

**ADM**

**AUD**

**1**

Xem danh sách Tenant

🔍 IDM‑01

❌

❌

🔍 AUD‑05

**2**

Xem chi tiết Tenant

🔍 IDM‑01

❌

❌

🔍 AUD‑05

**3**

Cập nhật cấu hình Tenant

✅ IDM‑01, IDM‑03

❌

✅ ADM‑01

✅ AUD‑05

**4**

Activate / Suspend Tenant

✅ IDM‑02

✅ AUTHZ‑11

❌

✅ AUD‑05

#### 2️⃣ Quản lý Người dùng (User Management)

**#**

**FE‑Admin Function**

**IDM**

**AUTHZ**

**TOKEN / SESSION**

**AUD**

**1**

Xem danh sách User

🔍 IDM‑05

❌

❌

🔍 AUD‑03

**2**

Xem chi tiết User

🔍 IDM‑05

🔍 AUTHZ‑06

🔍 SES‑01

🔍 AUD‑03

**3**

Gán / thu hồi Role cho User

✅ IDM‑05

✅ AUTHZ‑06

❌

✅ AUD‑04

**4**

Activate / Suspend User

✅ IDM‑07

❌

✅ TOK‑07

✅ AUD‑03

**5**

Xem IAM metadata (token/session)

🔍 IDM‑05

❌

🔍 TOK‑01 / SES‑01

🔍 AUD‑08

#### 3️⃣ Quản lý Vai trò & Quyền truy cập (RBAC)

**#**

**FE‑Admin Function**

**AUTHZ**

**ADM**

**AUD**

**1**

Xem danh sách Role

🔍 AUTHZ‑04

❌

🔍 AUD‑04

**2**

Xem chi tiết Role

🔍 AUTHZ‑04

❌

🔍 AUD‑04

**3**

Tạo mới Role (Tenant)

✅ AUTHZ‑05

✅ ADM‑01

✅ AUD‑04

**4**

Cập nhật Permission cho Role

✅ AUTHZ‑07

✅ ADM‑01

✅ AUD‑04

**5**

Gán Role cho User

✅ AUTHZ‑06

❌

✅ AUD‑04

**6**

Activate / Suspend Role

✅ AUTHZ‑04

❌

✅ AUD‑04

#### 4️⃣ Quản lý Phạm vi Dữ liệu (Scope / ABAC)

**#**

**FE‑Admin Function**

**AUTHZ**

**ADM**

**AUD**

**1**

Xem danh sách Scope

🔍 AUTHZ‑08

❌

🔍 AUD‑04

**2**

Tạo mới / cập nhật Scope

✅ AUTHZ‑08

✅ ADM‑01

✅ AUD‑04

**3**

Activate / Suspend Scope

✅ AUTHZ‑08

❌

✅ AUD‑04

**4**

Gán Scope cho User

✅ AUTHZ‑10

❌

✅ AUD‑04

**5**

Gán Scope cho Role

✅ AUTHZ‑10

❌

✅ AUD‑04

**6**

Xem Scope áp dụng

🔍 AUTHZ‑10

❌

🔍 AUD‑04

#### 5️⃣ Giám sát Hoạt động Phân quyền (Authorization Monitoring)

**#**

**FE‑Admin Function**

**AUTHZ**

**AUD**

**1**

Xem danh sách Authorization Log

🔍 AUTHZ‑02

🔍 AUD‑01

**2**

Xem chi tiết quyết định

🔍 AUTHZ‑03

🔍 AUD‑01

**3**

Lọc / tìm kiếm đa tiêu chí

❌

🔍 AUD‑08

**4**

Phân tích nguyên nhân ALLOW / DENY

🔍 AUTHZ‑03

🔍 AUD‑01

**5**

Phát hiện xu hướng bất thường

❌

🔍 AUD‑02

🔒 **Read‑only – không điều chỉnh policy**

#### 6️⃣ Kiểm toán & Truy vết (Audit & Traceability)

**#**

**FE‑Admin Function**

**AUD**

**ADM**

**1**

Xem audit log IAM

🔍 AUD‑03 → AUD‑06

❌

**2**

Truy vết theo correlationId

🔍 AUD‑08

❌

**3**

Phân tích lịch sử thay đổi

🔍 AUD‑03 / AUD‑04

❌

**4**

Xuất dữ liệu audit

✅ AUD‑07

✅ ADM‑07

**5**

Compliance Reporting

🔍 AUD‑06

✅ ADM‑08

#### 7️⃣ Hệ thống & Bảo mật

##### 7.1 System Configuration

**#**

**FE‑Admin Function**

**ADM**

**AUD**

**1**

Cấu hình IAM toàn cục

✅ ADM‑01

✅ AUD‑06

**2**

Cấu hình theo Tenant

✅ ADM‑01

✅ AUD‑05

**3**

Feature Flags

✅ ADM‑01

✅ AUD‑06

**4**

Rate limit / Throttling

✅ ADM‑02

✅ AUD‑06

**5**

Session & Token Policy

✅ ADM‑02, ADM‑03

✅ AUD‑06

##### 7.2 Security Configuration

**#**

**FE‑Admin Function**

**AUTHN**

**ADM**

**AUD**

**1**

Credential / Password Policy

✅ AUTHN‑06

✅ ADM‑01

✅ AUD‑06

**2**

MFA / Step‑up Auth

✅ AUTHN‑06

✅ ADM‑01

✅ AUD‑06

**3**

IP Allowlist / Blocklist

❌

✅ ADM‑01

✅ AUD‑06

**4**

Client / API Security

❌

✅ ADM‑02

✅ AUD‑06

##### 7.3 Security Monitoring (Read‑only)

**#**

**FE‑Admin Function**

**AUD**

**MON**

**1**

Theo dõi security events

🔍 AUD‑02

❌

**2**

Phát hiện brute force / abuse

🔍 AUD‑02

❌

**3**

Theo dõi health & integrity

❌

🔍 INT‑03 / INT‑04

## 3.2. Mô tả nghiệp vụ chi tiết

### IDM‑01 – Tenant Management – Create / Update Tenant

_(Tạo và Cập nhật Tenant)_

**1\. Mã chức năng**

**IDM‑01**

**2\. Tên chức năng**

**Tenant Management – Create / Update Tenant**

**3\. Mô tả tổng quát**

Chức năng **Create / Update Tenant** cho phép **quản trị viên hệ thống** tạo mới hoặc cập nhật thông tin của **Tenant** (đơn vị tổ chức như trường học, tổ chức) trong hệ thống SAE.

Tenant là **đơn vị cô lập dữ liệu và phân quyền cao nhất** trong kiến trúc Multi‑Tenant của hệ thống. Mọi người dùng, vai trò, phạm vi dữ liệu và chính sách truy cập đều **bắt buộc gắn với một Tenant hợp lệ**.

**4\. Mục tiêu nghiệp vụ**

*   Quản lý vòng đời Tenant trong hệ thống
*   Thiết lập ranh giới **cô lập dữ liệu và phân quyền**
*   Cho phép cấu hình các thuộc tính nghiệp vụ đặc thù theo từng Tenant
*   Làm nền tảng cho:
    *   User Management
    *   RBAC / ABAC
    *   Tenant‑based Authorization

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Super Admin

Thực hiện tạo và cập nhật Tenant

**2**

Auditor (read‑only)

Xem lịch sử thay đổi Tenant

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được xác thực thành công
*   Actor có vai trò **SUPER\_ADMIN**
*   Hệ thống IAM đang hoạt động bình thường

**7\. Điều kiện hậu (Post‑conditions)**

*   Tenant mới được tạo **hoặc** Tenant hiện hữu được cập nhật thành công
*   Thông tin Tenant được lưu trữ nhất quán
*   Audit log được ghi nhận đầy đủ
*   Tenant sẵn sàng được sử dụng cho:
    *   Gán user
    *   Gán role
    *   Áp dụng policy

**8\. Phạm vi chức năng**

**8.1. Create Tenant**

Cho phép tạo mới một Tenant với các thông tin cơ bản và cấu hình ban đầu.

**8.2. Update Tenant**

Cho phép cập nhật các thông tin **không định danh** của Tenant đã tồn tại.

**9\. Dữ liệu nghiệp vụ chính**

**9.1. Thuộc tính Tenant**

**#**

**Thuộc tính**

**Mô tả**

**1**

Tenant ID

Mã định danh Tenant (unique, không thay đổi)

**2**

Tenant Name

Tên hiển thị của Tenant

**3**

Description

Mô tả Tenant

**4**

Status

Trạng thái (Active / Suspended)

**5**

Configuration

Cấu hình nghiệp vụ theo Tenant

**6**

Created Date

Thời điểm tạo

**7**

Last Updated Date

Thời điểm cập nhật gần nhất

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑IDM‑01‑01

Tenant ID phải **duy nhất** trong toàn hệ thống

**2**

BR‑IDM‑01‑02

Tenant ID **không được phép thay đổi** sau khi tạo

**3**

BR‑IDM‑01‑03

Mỗi Tenant phải có **ít nhất một Admin**

**4**

BR‑IDM‑01‑04

Tenant có trạng thái _Suspended_ không được truy cập hệ thống

**5**

BR‑IDM‑01‑05

Không được xóa Tenant đã phát sinh dữ liệu (chỉ Suspend)

**6**

BR‑IDM‑01‑06

Mọi thay đổi Tenant phải được ghi Audit Log

**7**

BR‑IDM‑01‑07

Dữ liệu giữa các Tenant phải được **cô lập tuyệt đối**

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. Create Tenant**

1.  Super Admin chọn chức năng **Create Tenant**
2.  Nhập thông tin Tenant
3.  Hệ thống kiểm tra:
    *   Quyền của Actor
    *   Tính hợp lệ dữ liệu
    *   Trùng Tenant ID
4.  Hệ thống tạo Tenant mới
5.  Ghi nhận Audit Log
6.  Trả kết quả thành công

**11.2. Update Tenant**

1.  Super Admin chọn Tenant cần cập nhật
2.  Cập nhật các thông tin cho phép
3.  Hệ thống kiểm tra:
    *   Quyền của Actor
    *   Tính hợp lệ dữ liệu
4.  Hệ thống lưu thay đổi
5.  Ghi nhận Audit Log
6.  Trả kết quả thành công

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

Không đủ quyền

Từ chối thao tác, trả lỗi _Access Denied_

**2**

Trùng Tenant ID

Từ chối tạo mới, trả lỗi _Duplicate Tenant_

**3**

Dữ liệu không hợp lệ

Trả lỗi validate

**4**

Tenant không tồn tại

Từ chối cập nhật

**5**

Lỗi hệ thống

Trả lỗi _Internal Server Error_

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Chỉ Super Admin được phép thao tác

**2**

Audit

100% thay đổi phải được audit

**3**

Performance

Thao tác hoàn tất ≤ SLA hệ thống

**4**

Consistency

Không gây ảnh hưởng Tenant khác

**14\. Ngoài phạm vi (Out of Scope)**

*   Xóa vĩnh viễn Tenant
*   Quản lý nghiệp vụ bên trong Tenant
*   Quản lý dữ liệu domain (Activity, DRL)

**15\. Ghi chú**

*   IDM‑01 là **chức năng nền tảng** cho toàn bộ IAM
*   Mọi chức năng khác (User, Role, Scope) **phụ thuộc Tenant hợp lệ**

### IDM‑02 – Tenant Management – Activate / Suspend Tenant

_(Kích hoạt / Tạm khóa Tenant)_

**1\. Mã chức năng**

**IDM‑02**

**2\. Tên chức năng**

**Tenant Management – Activate / Suspend Tenant**

**3\. Mô tả tổng quát**

Chức năng **Activate / Suspend Tenant** cho phép **quản trị viên hệ thống** kiểm soát **trạng thái hoạt động** của một Tenant trong hệ thống SAE.

Việc thay đổi trạng thái Tenant ảnh hưởng **tức thời và toàn diện** đến:

*   Khả năng đăng nhập của toàn bộ User thuộc Tenant
*   Việc cấp và sử dụng token
*   Quyền truy cập vào tất cả các dịch vụ nghiệp vụ

Chức năng này được sử dụng trong các trường hợp:

*   Onboarding / Offboarding Tenant
*   Tạm dừng cung cấp dịch vụ
*   Xử lý sự cố bảo mật hoặc vi phạm hợp đồng

**4\. Mục tiêu nghiệp vụ**

*   Cho phép **kích hoạt hoặc tạm khóa Tenant** mà không làm mất dữ liệu
*   Đảm bảo **kiểm soát truy cập tập trung theo Tenant**
*   Hỗ trợ quản trị vận hành và xử lý sự cố
*   Tuân thủ nguyên tắc **Tenant Isolation & Security‑First**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Super Admin

Thực hiện Activate / Suspend Tenant

**2**

Auditor (read‑only)

Xem lịch sử thay đổi trạng thái Tenant

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được xác thực thành công
*   Actor có vai trò **SUPER\_ADMIN**
*   Tenant tồn tại hợp lệ trong hệ thống

**7\. Điều kiện hậu (Post‑conditions)**

**7.1. Activate Tenant**

*   Tenant chuyển sang trạng thái **Active**
*   User thuộc Tenant có thể đăng nhập
*   IAM có thể cấp token cho Tenant

**7.2. Suspend Tenant**

*   Tenant chuyển sang trạng thái **Suspended**
*   Toàn bộ User thuộc Tenant:
    *   Không thể đăng nhập mới
    *   Không thể sử dụng token hiện tại
*   Các request liên quan đến Tenant bị từ chối

**8\. Phạm vi chức năng**

**8.1. Activate Tenant**

*   Áp dụng cho Tenant đang ở trạng thái _Suspended_
*   Khôi phục khả năng truy cập hệ thống

**8.2. Suspend Tenant**

*   Áp dụng cho Tenant đang ở trạng thái _Active_
*   Tạm thời vô hiệu hóa toàn bộ Tenant

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Tenant ID

Định danh Tenant

**2**

Current Status

Trạng thái hiện tại

**3**

Target Status

Trạng thái sau khi thay đổi

**4**

Action By

Actor thực hiện

**5**

Action Time

Thời điểm thực hiện

**6**

Reason

Lý do thay đổi (nếu có)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑IDM‑02‑01

Chỉ **SUPER\_ADMIN** được phép Activate / Suspend Tenant

**2**

BR‑IDM‑02‑02

Tenant _Suspended_ không được cấp token mới

**3**

BR‑IDM‑02‑03

Token hiện tại của Tenant _Suspended_ phải bị **vô hiệu hoá**

**4**

BR‑IDM‑02‑04

Suspend Tenant **không xoá dữ liệu**

**5**

BR‑IDM‑02‑05

Mọi thay đổi trạng thái Tenant phải được **ghi Audit Log**

**6**

BR‑IDM‑02‑06

Không cho phép Suspend Tenant hệ thống (nếu có)

**7**

BR‑IDM‑02‑07

Thay đổi trạng thái có hiệu lực **ngay lập tức**

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. Activate Tenant**

1.  Super Admin chọn chức năng **Activate Tenant**
2.  Hệ thống kiểm tra:
    *   Quyền của Actor
    *   Trạng thái hiện tại của Tenant
3.  Hệ thống cập nhật trạng thái Tenant sang _Active_
4.  Ghi nhận Audit Log
5.  Trả kết quả thành công

**11.2. Suspend Tenant**

1.  Super Admin chọn chức năng **Suspend Tenant**
2.  Nhập lý do tạm khóa (nếu có)
3.  Hệ thống kiểm tra:
    *   Quyền của Actor
    *   Trạng thái hiện tại của Tenant
4.  Hệ thống cập nhật trạng thái Tenant sang _Suspended_
5.  Vô hiệu hoá hiệu lực truy cập của Tenant
6.  Ghi nhận Audit Log
7.  Trả kết quả thành công

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

Không đủ quyền

Từ chối thao tác, trả lỗi _Access Denied_

**2**

Tenant không tồn tại

Trả lỗi _Tenant Not Found_

**3**

Trạng thái không hợp lệ

Trả lỗi _Invalid State Transition_

**4**

Lỗi hệ thống

Trả lỗi _Internal Server Error_

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Thao tác chỉ cho phép Super Admin

**2**

Availability

Suspend phải có hiệu lực tức thời

**3**

Audit

100% thay đổi trạng thái được audit

**4**

Consistency

Không ảnh hưởng Tenant khác

**14\. Ngoài phạm vi (Out of Scope)**

*   Xoá vĩnh viễn Tenant
*   Tự động Suspend theo SLA
*   Quản lý hợp đồng / thanh toán Tenant

**15\. Ghi chú**

*   IDM‑02 thường được sử dụng cùng IDM‑01 trong vòng đời Tenant
*   Suspend Tenant là biện pháp **vận hành & bảo mật**, không phải xoá dữ liệu

### IDM‑03 – Tenant Management – Tenant Configuration

_(Cấu hình Tenant)_

**1\. Mã chức năng**

**IDM‑03**

**2\. Tên chức năng**

**Tenant Management – Tenant Configuration**

**3\. Mô tả tổng quát**

Chức năng **Tenant Configuration** cho phép **quản trị viên** cấu hình các **thuộc tính và chính sách nghiệp vụ áp dụng riêng cho từng Tenant** trong hệ thống SAE.

Các cấu hình này xác định **cách Tenant vận hành trong IAM**, bao gồm:

*   Chính sách truy cập
*   Chính sách token & session (ở mức nghiệp vụ)
*   Bật/tắt các tính năng được phép sử dụng

Chức năng này cho phép hệ thống hỗ trợ **mô hình Multi‑Tenant linh hoạt**, trong đó mỗi Tenant có thể có **chính sách và hành vi khác nhau** nhưng vẫn tuân thủ khung IAM thống nhất.

**4\. Mục tiêu nghiệp vụ**

*   Cho phép **tuỳ biến chính sách IAM theo từng Tenant**
*   Hỗ trợ nhiều mô hình vận hành Tenant trong cùng một hệ thống
*   Đảm bảo Tenant chỉ được sử dụng các tính năng được phép
*   Tăng khả năng kiểm soát, vận hành và tuân thủ

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Super Admin

Cấu hình Tenant ở mức hệ thống

**2**

Tenant Admin

Cấu hình Tenant trong phạm vi được phân quyền

**3**

Auditor (read‑only)

Xem lịch sử cấu hình Tenant

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được xác thực thành công
*   Actor có quyền quản trị Tenant tương ứng
*   Tenant tồn tại và ở trạng thái hợp lệ (_Active_ hoặc _Suspended_)

**7\. Điều kiện hậu (Post‑conditions)**

*   Cấu hình Tenant được cập nhật thành công
*   Cấu hình mới có hiệu lực theo phạm vi xác định
*   Audit log được ghi nhận đầy đủ
*   Không ảnh hưởng đến Tenant khác

**8\. Phạm vi chức năng**

**8.1. Cấu hình chính sách truy cập**

*   Bật/tắt các nhóm chức năng IAM
*   Áp dụng chính sách truy cập mặc định theo Tenant

**8.2. Cấu hình token & session (mức nghiệp vụ)**

*   Thời hạn hiệu lực token (theo policy cho phép)
*   Chính sách session timeout
*   Quy định concurrent session

**8.3. Cấu hình tính năng (Feature Configuration)**

*   Bật/tắt các tính năng theo Tenant
*   Áp dụng feature flag ở mức Tenant

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Tenant ID

Định danh Tenant

**2**

Configuration Key

Tên cấu hình

**3**

Configuration Value

Giá trị cấu hình

**4**

Effective Scope

Phạm vi áp dụng

**5**

Last Updated By

Actor thực hiện

**6**

Last Updated Time

Thời điểm cập nhật

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑IDM‑03‑01

Mỗi cấu hình phải gắn với **một Tenant cụ thể**

**2**

BR‑IDM‑03‑02

Tenant Admin chỉ được cấu hình trong phạm vi cho phép

**3**

BR‑IDM‑03‑03

Không cho phép cấu hình vượt quá chính sách hệ thống

**4**

BR‑IDM‑03‑04

Thay đổi cấu hình **không ảnh hưởng Tenant khác**

**5**

BR‑IDM‑03‑05

Mọi thay đổi cấu hình phải được **ghi Audit Log**

**6**

BR‑IDM‑03‑06

Cấu hình không hợp lệ phải bị từ chối

**7**

BR‑IDM‑03‑07

Thay đổi cấu hình có hiệu lực theo chính sách áp dụng

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Actor chọn chức năng **Tenant Configuration**
2.  Chọn Tenant cần cấu hình
3.  Cập nhật các tham số cấu hình
4.  Hệ thống kiểm tra:
    *   Quyền của Actor
    *   Tính hợp lệ của cấu hình
    *   Phạm vi cho phép
5.  Hệ thống lưu cấu hình mới
6.  Ghi nhận Audit Log
7.  Trả kết quả thành công

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

Không đủ quyền

Từ chối thao tác, trả lỗi _Access Denied_

**2**

Tenant không tồn tại

Trả lỗi _Tenant Not Found_

**3**

Cấu hình không hợp lệ

Trả lỗi _Invalid Configuration_

**4**

Vượt phạm vi cho phép

Trả lỗi _Policy Violation_

**5**

Lỗi hệ thống

Trả lỗi _Internal Server Error_

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Kiểm soát quyền theo vai trò

**2**

Audit

100% thay đổi cấu hình được audit

**3**

Isolation

Không ảnh hưởng Tenant khác

**4**

Consistency

Cấu hình nhất quán

**14\. Ngoài phạm vi (Out of Scope)**

*   Thiết kế chi tiết policy engine
*   Cấu hình hạ tầng (network, database)
*   Tự động thay đổi cấu hình theo thời gian

**15\. Ghi chú**

*   IDM‑03 hỗ trợ **đa dạng mô hình Tenant** trong cùng hệ thống
*   Là nền tảng cho:
    *   Authorization Management
    *   Token & Session Policy
    *   Feature Governance

### IDM‑04 – Tenant Management – Tenant Isolation

_(Cô lập Tenant)_

**1\. Mã chức năng**

**IDM‑04**

**2\. Tên chức năng**

**Tenant Management – Tenant Isolation**

**3\. Mô tả tổng quát**

Chức năng **Tenant Isolation** đảm bảo **cô lập tuyệt đối dữ liệu, định danh và quyền truy cập giữa các Tenant** trong hệ thống SAE.

Tenant Isolation là **nguyên tắc kiến trúc và nghiệp vụ cốt lõi** của mô hình Multi‑Tenant, nhằm đảm bảo rằng:

*   User của Tenant này **không thể** truy cập dữ liệu hoặc tài nguyên của Tenant khác
*   Mọi quyết định xác thực, phân quyền và xử lý nghiệp vụ **luôn được đánh giá trong ngữ cảnh Tenant**

Chức năng này không phải là một thao tác đơn lẻ của người dùng, mà là **yêu cầu nghiệp vụ xuyên suốt**, áp dụng cho **toàn bộ vòng đời xử lý request** trong hệ thống.

**4\. Mục tiêu nghiệp vụ**

*   Đảm bảo **an toàn và bảo mật dữ liệu** giữa các Tenant
*   Ngăn chặn mọi hình thức **truy cập chéo Tenant**
*   Đáp ứng yêu cầu **tuân thủ và kiểm toán** (compliance)
*   Là nền tảng cho:
    *   Authorization theo Tenant
    *   Audit & Forensic
    *   Vận hành hệ thống Multi‑Tenant

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

System (IAM Runtime)

Tự động áp dụng Tenant Isolation

**2**

Super Admin

Giám sát và cấu hình liên quan

**3**

Auditor (read‑only)

Kiểm tra tuân thủ Tenant Isolation

**Lưu ý:** Người dùng cuối **không trực tiếp kích hoạt** chức năng này.

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Tenant đã được tạo hợp lệ trong hệ thống
*   Mọi User đều được gán **chính xác một Tenant**
*   Mọi request đều mang **Tenant Context hợp lệ**

**7\. Điều kiện hậu (Post‑conditions)**

*   Request được xử lý **chỉ trong phạm vi Tenant tương ứng**
*   Mọi truy cập chéo Tenant bị từ chối
*   Không xảy ra rò rỉ dữ liệu giữa các Tenant
*   Vi phạm Tenant Isolation (nếu có) được ghi nhận để audit

**8\. Phạm vi chức năng**

**8.1. Tenant Context Enforcement**

*   Mỗi request phải có Tenant Context
*   Tenant Context được xác định từ:
    *   Token
    *   Hoặc định danh người dùng

**8.2. Identity Isolation**

*   User chỉ thuộc **một Tenant duy nhất**
*   Không cho phép User tồn tại ở nhiều Tenant

**8.3. Authorization Isolation**

*   Mọi đánh giá RBAC / ABAC phải gắn với Tenant
*   Role và Scope **không dùng chung** giữa các Tenant

**8.4. Data Access Isolation**

*   Không truy vấn hoặc xử lý dữ liệu ngoài Tenant Context
*   Không có cơ chế override Tenant Isolation

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Tenant ID

Định danh Tenant

**2**

User ID

Định danh User

**3**

Request Context

Ngữ cảnh xử lý

**4**

Resource

Tài nguyên được truy cập

**5**

Action

Hành động yêu cầu

**6**

Isolation Result

Kết quả kiểm soát (Pass / Reject)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑IDM‑04‑01

Mỗi User **bắt buộc** thuộc đúng **một Tenant**

**2**

BR‑IDM‑04‑02

Mọi request **phải có Tenant Context hợp lệ**

**3**

BR‑IDM‑04‑03

Không cho phép truy cập chéo Tenant trong mọi trường hợp

**4**

BR‑IDM‑04‑04

Role, Scope, Policy **không được dùng chung** giữa các Tenant

**5**

BR‑IDM‑04‑05

Tenant Isolation **không thể bị vô hiệu hoá**

**6**

BR‑IDM‑04‑06

Vi phạm Tenant Isolation phải bị từ chối ngay lập tức

**7**

BR‑IDM‑04‑07

Vi phạm Tenant Isolation phải được **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Hệ thống nhận request
2.  Xác định Tenant Context của request
3.  Kiểm tra sự khớp giữa:
    *   User
    *   Token
    *   Tenant Context
4.  Áp dụng Tenant Isolation
5.  Cho phép xử lý tiếp **hoặc** từ chối truy cập
6.  Ghi nhận audit (nếu có vi phạm)

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

Thiếu Tenant Context

Từ chối request

**2**

Tenant Context không hợp lệ

Từ chối request

**3**

Truy cập chéo Tenant

Từ chối + audit

**4**

Lỗi hệ thống

Trả lỗi _Internal Server Error_

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Cô lập tuyệt đối dữ liệu

**2**

Compliance

Đáp ứng yêu cầu kiểm toán

**3**

Reliability

Áp dụng nhất quán

**4**

Auditability

Ghi nhận vi phạm

**14\. Ngoài phạm vi (Out of Scope)**

*   Chia sẻ dữ liệu giữa Tenant
*   Liên kết Tenant
*   Migrate User giữa Tenant

**15\. Ghi chú**

*   IDM‑04 là **nguyên tắc bắt buộc**, không phải tuỳ chọn
*   Mọi chức năng IAM và Business Service **đều phụ thuộc IDM‑04**

### IDM‑05 – User Management – Create / Update User

_(Tạo và Cập nhật Người dùng)_

**1\. Mã chức năng**

**IDM‑05**

**2\. Tên chức năng**

**User Management – Create / Update User**

**3\. Mô tả tổng quát**

Chức năng **Create / Update User** cho phép **quản trị viên** tạo mới hoặc cập nhật thông tin **User** thuộc một **Tenant cụ thể** trong hệ thống SAE.

User là **định danh nghiệp vụ trung tâm** để:

*   Thực hiện xác thực (qua IdP)
*   Gán vai trò (RBAC)
*   Áp dụng phạm vi dữ liệu (ABAC)
*   Ghi nhận audit và truy vết truy cập

Chức năng này đảm bảo rằng **mọi User tồn tại trong hệ thống đều hợp lệ, được gắn Tenant rõ ràng và sẵn sàng tham gia cơ chế phân quyền**.

**4\. Mục tiêu nghiệp vụ**

*   Quản lý vòng đời User trong hệ thống IAM
*   Đảm bảo User được gán đúng Tenant
*   Thiết lập dữ liệu định danh chuẩn cho phân quyền và audit
*   Hỗ trợ quản trị vận hành và tích hợp hệ thống ngoài

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Super Admin

Quản lý User trên toàn hệ thống

**2**

Tenant Admin

Quản lý User trong Tenant

**3**

IAM Operator

Hỗ trợ vận hành

**4**

Auditor (read‑only)

Xem thông tin User

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được xác thực thành công
*   Actor có quyền quản lý User trong Tenant tương ứng
*   Tenant tồn tại và ở trạng thái hợp lệ (_Active_)
*   Tuân thủ nguyên tắc **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

**7.1. Create User**

*   User mới được tạo thành công
*   User được gán đúng một Tenant
*   Trạng thái User mặc định là _Active_ (trừ khi cấu hình khác)
*   Audit log được ghi nhận

**7.2. Update User**

*   Thông tin User được cập nhật hợp lệ
*   Không ảnh hưởng đến định danh gốc
*   Audit log được ghi nhận

**8\. Phạm vi chức năng**

**8.1. Create User**

*   Tạo mới User trong một Tenant
*   Khai báo thông tin định danh nghiệp vụ

**8.2. Update User**

*   Cập nhật các thông tin **cho phép** của User đã tồn tại
*   Không cho phép thay đổi Tenant của User

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

User ID

Định danh nội bộ (system‑generated)

**2**

External ID

Định danh từ hệ thống ngoài / IdP

**3**

Username / Email

Định danh đăng nhập

**4**

Full Name

Tên hiển thị

**5**

Tenant ID

Tenant mà User thuộc về

**6**

Status

Trạng thái User (Active / Suspended)

**7**

Created Time

Thời điểm tạo

**8**

Last Updated Time

Thời điểm cập nhật

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑IDM‑05‑01

Mỗi User **bắt buộc** thuộc **một Tenant duy nhất**

**2**

BR‑IDM‑05‑02

Không cho phép thay đổi Tenant của User sau khi tạo

**3**

BR‑IDM‑05‑03

Định danh gốc (External ID, Email) **không được thay đổi**

**4**

BR‑IDM‑05‑04

User phải có trạng thái hợp lệ (_Active_ hoặc _Suspended_)

**5**

BR‑IDM‑05‑05

Không cho phép tạo User trùng định danh trong cùng Tenant

**6**

BR‑IDM‑05‑06

Mọi thay đổi User phải được **ghi Audit Log**

**7**

BR‑IDM‑05‑07

User thuộc Tenant _Suspended_ không được tạo mới

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. Create User**

1.  Actor chọn chức năng **Create User**
2.  Chọn Tenant (nếu là Super Admin)
3.  Nhập thông tin User
4.  Hệ thống kiểm tra:
    *   Quyền của Actor
    *   Trạng thái Tenant
    *   Tính hợp lệ và trùng lặp định danh
5.  Hệ thống tạo User mới
6.  Ghi nhận Audit Log
7.  Trả kết quả thành công

**11.2. Update User**

1.  Actor chọn User cần cập nhật
2.  Cập nhật các thông tin cho phép
3.  Hệ thống kiểm tra:
    *   Quyền của Actor
    *   Tính hợp lệ dữ liệu
4.  Hệ thống lưu thay đổi
5.  Ghi nhận Audit Log
6.  Trả kết quả thành công

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

Không đủ quyền

Từ chối thao tác (_Access Denied_)

**2**

Tenant không hợp lệ

Từ chối tạo User

**3**

Trùng định danh

Trả lỗi _Duplicate User_

**4**

User không tồn tại

Từ chối cập nhật

**5**

Dữ liệu không hợp lệ

Trả lỗi validate

**6**

Lỗi hệ thống

Trả lỗi _Internal Server Error_

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Kiểm soát quyền theo vai trò

**2**

Isolation

Tuân thủ Tenant Isolation

**3**

Audit

100% thay đổi User được audit

**4**

Consistency

Dữ liệu User nhất quán

**14\. Ngoài phạm vi (Out of Scope)**

*   Quản lý mật khẩu, MFA
*   Gán role hoặc scope cho User
*   Migrate User giữa Tenant

**15\. Ghi chú**

*   IDM‑05 là đầu vào trực tiếp cho:
    *   Authorization Management (RBAC / ABAC)
    *   Audit & Logging
*   Mọi chức năng quản lý quyền **phụ thuộc User hợp lệ**

### IDM‑06 – User Management – Sync User from External System

_(Đồng bộ Người dùng từ Hệ thống Bên ngoài)_

**1\. Mã chức năng**

**IDM‑06**

**2\. Tên chức năng**

**User Management – Sync User from External System**

**3\. Mô tả tổng quát**

Chức năng **Sync User from External System** cho phép hệ thống IAM **nhận, đồng bộ và duy trì nhất quán thông tin User** từ các **hệ thống nguồn bên ngoài** (ví dụ: SIS, HRM, ERP, hoặc Identity Provider).

Chức năng này giúp đảm bảo rằng **định danh người dùng trong IAM phản ánh chính xác dữ liệu nguồn chính thức**, giảm thao tác thủ công và hạn chế sai lệch dữ liệu giữa các hệ thống.

Việc đồng bộ User **không thay thế xác thực** mà chỉ phục vụ quản lý định danh và phân quyền.

**4\. Mục tiêu nghiệp vụ**

*   Tự động hoá việc tạo và cập nhật User từ hệ thống nguồn
*   Đảm bảo dữ liệu định danh **nhất quán và đáng tin cậy**
*   Giảm rủi ro sai sót khi quản lý User thủ công
*   Hỗ trợ tích hợp hệ thống trong môi trường Enterprise

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

External System

Hệ thống nguồn cung cấp dữ liệu User

**2**

IAM System

Tiếp nhận và xử lý dữ liệu đồng bộ

**3**

Super Admin

Giám sát và cấu hình đồng bộ

**4**

Auditor (read‑only)

Xem lịch sử đồng bộ

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   External System đã được **đăng ký và cho phép tích hợp**
*   Có cấu hình ánh xạ dữ liệu (mapping) hợp lệ
*   Tenant mục tiêu tồn tại và ở trạng thái _Active_
*   Tuân thủ nguyên tắc **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   User được tạo mới hoặc cập nhật tương ứng trong IAM
*   Không phát sinh User trùng hoặc sai Tenant
*   Trạng thái User được đồng bộ theo quy tắc cấu hình
*   Audit log và Sync log được ghi nhận

**8\. Phạm vi chức năng**

**8.1. Nhận dữ liệu từ hệ thống ngoài**

*   Tiếp nhận danh sách hoặc bản ghi User
*   Hỗ trợ đồng bộ theo Tenant

**8.2. Ánh xạ định danh (Identity Mapping)**

*   Ánh xạ **External ID → User nội bộ**
*   Xác định User đã tồn tại hay chưa

**8.3. Đồng bộ User**

*   Tạo User mới nếu chưa tồn tại
*   Cập nhật User nếu đã tồn tại
*   Không ghi đè định danh gốc trái phép

**8.4. Quản lý trạng thái đồng bộ**

*   Ghi nhận kết quả đồng bộ
*   Phát hiện và xử lý lỗi đồng bộ

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

External System ID

Định danh hệ thống nguồn

**2**

External User ID

Định danh User tại hệ thống nguồn

**3**

User ID

Định danh User trong IAM

**4**

Tenant ID

Tenant áp dụng

**5**

Sync Action

Create / Update / Skip

**6**

Sync Status

Success / Failed

**7**

Sync Time

Thời điểm đồng bộ

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑IDM‑06‑01

External User ID phải **unique trong một Tenant**

**2**

BR‑IDM‑06‑02

External ID là **định danh gốc**, không được sửa thủ công

**3**

BR‑IDM‑06‑03

Không được tạo User ngoài Tenant chỉ định

**4**

BR‑IDM‑06‑04

Đồng bộ **không được xoá User** trong IAM

**5**

BR‑IDM‑06‑05

Dữ liệu từ hệ thống nguồn có thể cập nhật User hiện hữu

**6**

BR‑IDM‑06‑06

Lỗi đồng bộ không được ảnh hưởng User khác

**7**

BR‑IDM‑06‑07

Mọi hoạt động đồng bộ phải được **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  External System gửi dữ liệu User tới IAM
2.  IAM xác định Tenant mục tiêu
3.  IAM thực hiện ánh xạ External User ID
4.  Hệ thống quyết định:
    *   Create User (nếu chưa tồn tại)
    *   Update User (nếu đã tồn tại)
5.  IAM lưu kết quả đồng bộ
6.  Ghi nhận Audit Log và Sync Log
7.  Trả kết quả đồng bộ

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

Tenant không tồn tại

Từ chối đồng bộ

**2**

Dữ liệu không hợp lệ

Bỏ qua bản ghi lỗi

**3**

Trùng External ID

Từ chối bản ghi

**4**

Lỗi hệ thống

Ghi lỗi, không rollback bản ghi khác

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Integration

Hỗ trợ tích hợp hệ thống ngoài

**2**

Security

Kiểm soát nguồn dữ liệu

**3**

Audit

100% hoạt động sync được audit

**4**

Reliability

Không ảnh hưởng User hiện hữu

**14\. Ngoài phạm vi (Out of Scope)**

*   Quản lý credential từ hệ thống ngoài
*   Xoá User theo dữ liệu nguồn
*   Đồng bộ role hoặc scope

**15\. Ghi chú**

*   IDM‑06 thường kết hợp với **IDM‑05** trong vận hành thực tế
*   External System được xem là **nguồn dữ liệu tham chiếu**, không phải nguồn phân quyền

### IDM‑07 – User Management – Activate / Suspend User

_(Kích hoạt / Tạm khóa Người dùng)_

**1\. Mã chức năng**

**IDM‑07**

**2\. Tên chức năng**

**User Management – Activate / Suspend User**

**3\. Mô tả tổng quát**

Chức năng **Activate / Suspend User** cho phép **quản trị viên** kiểm soát **trạng thái hoạt động** của một User trong hệ thống IAM.

Việc thay đổi trạng thái User ảnh hưởng trực tiếp đến:

*   Khả năng đăng nhập của User
*   Việc cấp và sử dụng token truy cập
*   Khả năng thực hiện các hành động nghiệp vụ trong hệ thống

Chức năng này được sử dụng trong các trường hợp:

*   Onboarding / Offboarding nhân sự, sinh viên
*   Tạm khóa tài khoản do vi phạm hoặc nghi ngờ an ninh
*   Kiểm soát truy cập tạm thời theo yêu cầu vận hành

**4\. Mục tiêu nghiệp vụ**

*   Cho phép **kích hoạt hoặc tạm khóa User** mà không xoá dữ liệu
*   Đảm bảo kiểm soát truy cập **ở mức cá nhân**
*   Hỗ trợ vận hành, bảo mật và tuân thủ
*   Phối hợp chặt chẽ với Token & Session Management

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Super Admin

Kích hoạt / tạm khóa User toàn hệ thống

**2**

Tenant Admin

Kích hoạt / tạm khóa User trong Tenant

**3**

IAM Operator

Hỗ trợ vận hành

**4**

Auditor (read‑only)

Xem lịch sử thay đổi trạng thái User

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được xác thực thành công
*   Actor có quyền quản lý User trong Tenant tương ứng
*   User tồn tại hợp lệ trong hệ thống
*   Tenant của User đang ở trạng thái _Active_

**7\. Điều kiện hậu (Post‑conditions)**

**7.1. Activate User**

*   User chuyển sang trạng thái **Active**
*   User có thể đăng nhập và được cấp token
*   User có thể truy cập hệ thống theo quyền được gán

**7.2. Suspend User**

*   User chuyển sang trạng thái **Suspended**
*   User:
    *   Không thể đăng nhập mới
    *   Không thể sử dụng token hiện tại
*   Các request của User bị từ chối

**8\. Phạm vi chức năng**

**8.1. Activate User**

*   Áp dụng cho User đang ở trạng thái _Suspended_
*   Khôi phục khả năng truy cập hệ thống

**8.2. Suspend User**

*   Áp dụng cho User đang ở trạng thái _Active_
*   Tạm thời vô hiệu hoá toàn bộ truy cập của User

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

User ID

Định danh User

**2**

Tenant ID

Tenant của User

**3**

Current Status

Trạng thái hiện tại

**4**

Target Status

Trạng thái sau khi thay đổi

**5**

Action By

Actor thực hiện

**6**

Action Time

Thời điểm thực hiện

**7**

Reason

Lý do thay đổi (nếu có)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑IDM‑07‑01

User chỉ có trạng thái _Active_ hoặc _Suspended_

**2**

BR‑IDM‑07‑02

User _Suspended_ không được cấp token mới

**3**

BR‑IDM‑07‑03

Token hiện tại của User _Suspended_ phải bị **vô hiệu hoá**

**4**

BR‑IDM‑07‑04

Suspend User **không xoá dữ liệu**

**5**

BR‑IDM‑07‑05

Chỉ Actor có quyền mới được thay đổi trạng thái User

**6**

BR‑IDM‑07‑06

Mọi thay đổi trạng thái User phải được **ghi Audit Log**

**7**

BR‑IDM‑07‑07

Không cho phép Activate User thuộc Tenant _Suspended_

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. Activate User**

1.  Actor chọn chức năng **Activate User**
2.  Hệ thống kiểm tra:
    *   Quyền của Actor
    *   Trạng thái hiện tại của User
    *   Trạng thái Tenant
3.  Hệ thống cập nhật trạng thái User sang _Active_
4.  Ghi nhận Audit Log
5.  Trả kết quả thành công

**11.2. Suspend User**

1.  Actor chọn chức năng **Suspend User**
2.  Nhập lý do tạm khóa (nếu có)
3.  Hệ thống kiểm tra:
    *   Quyền của Actor
    *   Trạng thái hiện tại của User
4.  Hệ thống cập nhật trạng thái User sang _Suspended_
5.  Vô hiệu hoá hiệu lực truy cập của User
6.  Ghi nhận Audit Log
7.  Trả kết quả thành công

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

Không đủ quyền

Từ chối thao tác (_Access Denied_)

**2**

User không tồn tại

Trả lỗi _User Not Found_

**3**

Trạng thái không hợp lệ

Trả lỗi _Invalid State Transition_

**4**

Tenant bị Suspend

Từ chối Activate User

**5**

Lỗi hệ thống

Trả lỗi _Internal Server Error_

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Vô hiệu hoá truy cập ngay lập tức

**2**

Audit

100% thay đổi trạng thái User được audit

**3**

Availability

Suspend có hiệu lực tức thời

**4**

Consistency

Không ảnh hưởng User khác

**14\. Ngoài phạm vi (Out of Scope)**

*   Xoá vĩnh viễn User
*   Tự động Suspend theo hành vi
*   Khôi phục dữ liệu User

**15\. Ghi chú**

*   IDM‑07 là chức năng kiểm soát truy cập **ở mức cá nhân**
*   Thường được sử dụng kết hợp với:
    *   IDM‑05 (Create / Update User)
    *   Token & Session Management

### IDM‑08 – User Management – Bulk User Import

_(Nhập Người dùng Hàng loạt)_

**1\. Mã chức năng**

**IDM‑08**

**2\. Tên chức năng**

**User Management – Bulk User Import**

**3\. Mô tả tổng quát**

Chức năng **Bulk User Import** cho phép **quản trị viên** nhập **nhiều User cùng lúc** vào hệ thống IAM cho một **Tenant xác định**, thông qua tập dữ liệu được chuẩn hoá.

Chức năng này hỗ trợ các kịch bản nghiệp vụ như:

*   Onboarding số lượng lớn người dùng (sinh viên, nhân sự)
*   Khởi tạo Tenant mới
*   Chuyển đổi hệ thống (data migration ở mức nghiệp vụ)

Bulk User Import giúp **giảm thao tác thủ công**, đảm bảo **tính nhất quán dữ liệu** và **kiểm soát lỗi tập trung**.

**4\. Mục tiêu nghiệp vụ**

*   Hỗ trợ nhập User hàng loạt một cách hiệu quả
*   Đảm bảo dữ liệu User hợp lệ trước khi ghi nhận
*   Ngăn ngừa việc tạo User sai Tenant hoặc trùng định danh
*   Hỗ trợ audit và kiểm soát vận hành

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Super Admin

Import User cho nhiều Tenant

**2**

Tenant Admin

Import User trong Tenant

**3**

IAM Operator

Hỗ trợ vận hành import

**4**

Auditor (read‑only)

Xem kết quả và lịch sử import

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được xác thực thành công
*   Actor có quyền import User trong Tenant tương ứng
*   Tenant tồn tại và ở trạng thái _Active_
*   Dữ liệu import tuân thủ định dạng được hệ thống chấp nhận
*   Tuân thủ nguyên tắc **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   Các User hợp lệ được tạo mới hoặc cập nhật thành công
*   Các bản ghi lỗi **không được ghi** vào hệ thống
*   Kết quả import được ghi nhận chi tiết
*   Audit log được ghi nhận đầy đủ

**8\. Phạm vi chức năng**

**8.1. Tiếp nhận dữ liệu import**

*   Nhận tập dữ liệu User cho một Tenant
*   Xác định phạm vi import theo Tenant

**8.2. Validate dữ liệu trước khi import**

*   Kiểm tra định dạng dữ liệu
*   Kiểm tra trùng lặp định danh
*   Kiểm tra trạng thái Tenant

**8.3. Thực hiện import**

*   Tạo User mới nếu chưa tồn tại
*   Cập nhật User nếu đã tồn tại (theo cấu hình cho phép)
*   Bỏ qua bản ghi không hợp lệ

**8.4. Quản lý kết quả import**

*   Tổng hợp số lượng thành công / thất bại
*   Ghi nhận chi tiết lỗi theo từng bản ghi

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Import Batch ID

Định danh lô import

**2**

Tenant ID

Tenant áp dụng

**3**

User Identifier

Email / External ID

**4**

Import Action

Create / Update / Skip

**5**

Import Status

Success / Failed

**6**

Error Message

Mô tả lỗi (nếu có)

**7**

Import Time

Thời điểm import

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑IDM‑08‑01

Bulk Import chỉ áp dụng cho **một Tenant tại một thời điểm**

**2**

BR‑IDM‑08‑02

Không import User cho Tenant _Suspended_

**3**

BR‑IDM‑08‑03

Không cho phép tạo User trùng định danh trong cùng Tenant

**4**

BR‑IDM‑08‑04

Định danh gốc (Email / External ID) không được thay đổi

**5**

BR‑IDM‑08‑05

Bản ghi lỗi **không được ghi** vào hệ thống

**6**

BR‑IDM‑08‑06

Lỗi của một bản ghi **không ảnh hưởng** bản ghi khác

**7**

BR‑IDM‑08‑07

Mọi hoạt động import phải được **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Actor chọn chức năng **Bulk User Import**
2.  Chọn Tenant (nếu là Super Admin)
3.  Tải lên tập dữ liệu User
4.  Hệ thống thực hiện validate dữ liệu
5.  Hệ thống thực hiện import:
    *   Create / Update / Skip theo từng bản ghi
6.  Hệ thống tổng hợp kết quả import
7.  Ghi nhận Audit Log
8.  Trả kết quả import cho Actor

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

Không đủ quyền

Từ chối import (_Access Denied_)

**2**

Tenant không hợp lệ

Từ chối import

**3**

Dữ liệu sai định dạng

Từ chối toàn bộ lô import

**4**

Bản ghi lỗi

Bỏ qua bản ghi, ghi chi tiết lỗi

**5**

Lỗi hệ thống

Dừng import, ghi lỗi hệ thống

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Performance

Xử lý được số lượng lớn User

**2**

Security

Kiểm soát quyền import

**3**

Audit

Ghi nhận đầy đủ lịch sử import

**4**

Reliability

Không ảnh hưởng User hiện hữu

**14\. Ngoài phạm vi (Out of Scope)**

*   Import role hoặc permission
*   Import password hoặc credential
*   Import User cho nhiều Tenant trong một lô

**15\. Ghi chú**

*   IDM‑08 thường được dùng kết hợp với:
    *   IDM‑05 (Create / Update User)
    *   IDM‑06 (Sync User from External System)
*   Bulk Import là **nghiệp vụ vận hành**, không phải cơ chế đồng bộ thời gian thực

### IDM‑09 – User Management – User Profile Management

_(Quản lý Hồ sơ Người dùng)_

**1\. Mã chức năng**

**IDM‑09**

**2\. Tên chức năng**

**User Management – User Profile Management**

**3\. Mô tả tổng quát**

Chức năng **User Profile Management** cho phép **xem và cập nhật thông tin hồ sơ cá nhân của User** trong hệ thống IAM, trong phạm vi **không ảnh hưởng đến định danh gốc và phân quyền**.

Hồ sơ người dùng phản ánh các thông tin nghiệp vụ phục vụ:

*   Hiển thị thông tin cá nhân
*   Nhận diện người dùng trong hệ thống
*   Hỗ trợ vận hành và audit

Chức năng này đảm bảo rằng việc cập nhật hồ sơ **không làm thay đổi định danh, Tenant, hay quyền truy cập** của User.

**4\. Mục tiêu nghiệp vụ**

*   Cho phép quản lý thông tin hồ sơ User một cách chuẩn hoá
*   Phân tách rõ **profile data** và **identity data**
*   Đảm bảo tuân thủ chính sách bảo vệ dữ liệu cá nhân
*   Hỗ trợ audit và truy vết thay đổi

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

User

Xem / cập nhật hồ sơ cá nhân (phần được phép)

**2**

Tenant Admin

Xem / cập nhật hồ sơ User trong Tenant

**3**

Super Admin

Xem / cập nhật hồ sơ User toàn hệ thống

**4**

Auditor (read‑only)

Xem thông tin và lịch sử thay đổi

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được xác thực thành công
*   Actor có quyền truy cập hồ sơ User tương ứng
*   User tồn tại hợp lệ trong hệ thống
*   Tuân thủ nguyên tắc **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   Thông tin hồ sơ User được hiển thị hoặc cập nhật thành công
*   Không có thay đổi đối với:
    *   Tenant của User
    *   Trạng thái User
    *   Định danh gốc
*   Audit log được ghi nhận (đối với thao tác cập nhật)

**8\. Phạm vi chức năng**

**8.1. Xem hồ sơ User**

*   Hiển thị thông tin hồ sơ cá nhân
*   Áp dụng kiểm soát quyền theo vai trò

**8.2. Cập nhật hồ sơ User**

*   Cho phép cập nhật các trường hồ sơ được phép
*   Áp dụng validate dữ liệu trước khi lưu

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

User ID

Định danh User

**2**

Tenant ID

Tenant của User

**3**

Full Name

Tên hiển thị

**4**

Phone Number

Số điện thoại

**5**

Address

Địa chỉ liên hệ

**6**

Avatar / Photo

Ảnh đại diện

**7**

Last Updated By

Actor thực hiện

**8**

Last Updated Time

Thời điểm cập nhật

**Lưu ý:** Các trường này mang tính nghiệp vụ, **không phải định danh gốc**.

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑IDM‑09‑01

User chỉ được cập nhật **hồ sơ của chính mình**, trừ khi có quyền quản trị

**2**

BR‑IDM‑09‑02

Không cho phép cập nhật định danh gốc (Email, External ID)

**3**

BR‑IDM‑09‑03

Không cho phép thay đổi Tenant của User

**4**

BR‑IDM‑09‑04

Thay đổi hồ sơ **không ảnh hưởng phân quyền**

**5**

BR‑IDM‑09‑05

Dữ liệu hồ sơ phải tuân thủ chính sách bảo vệ dữ liệu cá nhân

**6**

BR‑IDM‑09‑06

Mọi cập nhật hồ sơ phải được **ghi Audit Log**

**7**

BR‑IDM‑09‑07

Không cho phép cập nhật hồ sơ của User _Suspended_ (nếu cấu hình)

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. Xem hồ sơ User**

1.  Actor truy cập chức năng **User Profile**
2.  Hệ thống kiểm tra:
    *   Quyền truy cập
    *   Tenant Context
3.  Hệ thống hiển thị thông tin hồ sơ User

**11.2. Cập nhật hồ sơ User**

1.  Actor chọn chức năng **Edit Profile**
2.  Cập nhật các trường cho phép
3.  Hệ thống kiểm tra:
    *   Quyền của Actor
    *   Tính hợp lệ dữ liệu
4.  Hệ thống lưu thay đổi hồ sơ
5.  Ghi nhận Audit Log
6.  Trả kết quả thành công

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

Không đủ quyền

Từ chối thao tác (_Access Denied_)

**2**

User không tồn tại

Trả lỗi _User Not Found_

**3**

User bị Suspend

Từ chối cập nhật (nếu áp dụng)

**4**

Dữ liệu không hợp lệ

Trả lỗi validate

**5**

Lỗi hệ thống

Trả lỗi _Internal Server Error_

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Kiểm soát truy cập hồ sơ

**2**

Privacy

Tuân thủ bảo vệ dữ liệu cá nhân

**3**

Audit

Ghi nhận đầy đủ lịch sử thay đổi

**4**

Usability

Dễ sử dụng, rõ ràng

**14\. Ngoài phạm vi (Out of Scope)**

*   Thay đổi email / username
*   Thay đổi mật khẩu hoặc MFA
*   Gán role hoặc permission
*   Xem hồ sơ User khác Tenant

**15\. Ghi chú**

*   IDM‑09 tách biệt rõ:
    *   **Identity** (định danh & phân quyền)
    *   **Profile** (thông tin nghiệp vụ)
*   Đây là chức năng cuối trong nhóm **Identity Management**

### AUTHN‑01 – IdP Integration Identity – Provider Integration

_(Tích hợp Nhà cung cấp Định danh – IdP)_

**1\. Mã chức năng**

**AUTHN‑01**

**2\. Tên chức năng**

**IdP Integration Identity – Identity Provider Integration**

**3\. Mô tả tổng quát**

Chức năng **Identity Provider Integration** cho phép hệ thống IAM **tích hợp với một hoặc nhiều Identity Provider (IdP)** bên ngoài nhằm thực hiện **xác thực người dùng** theo các chuẩn xác thực phổ biến.

IAM **không trực tiếp xác thực credential của User**, mà **ủy quyền việc xác thực cho IdP**, sau đó:

*   Nhận kết quả xác thực
*   Xác định User tương ứng trong IAM
*   Thiết lập ngữ cảnh xác thực để phục vụ cấp token và phân quyền

Chức năng này là **nền tảng của toàn bộ Authentication Flow** trong hệ thống.

**4\. Mục tiêu nghiệp vụ**

*   Cho phép sử dụng các IdP chuẩn (Enterprise / Cloud / External)
*   Tách biệt rõ ràng giữa:
    *   **Authentication (xác thực)** và
    *   **Identity / Authorization (định danh & phân quyền)**
*   Hỗ trợ SSO và tích hợp hệ thống
*   Đảm bảo bảo mật và tuân thủ tiêu chuẩn xác thực

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

User

Thực hiện đăng nhập

**2**

Identity Provider (IdP)

Thực hiện xác thực

**3**

IAM System

Điều phối luồng xác thực

**4**

Super Admin

Cấu hình và quản lý IdP

**5**

Auditor (read‑only)

Giám sát hoạt động xác thực

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   IdP đã được cấu hình và kích hoạt trong hệ thống
*   Có cấu hình ánh xạ định danh giữa IdP và IAM
*   Tenant của User tồn tại và ở trạng thái _Active_
*   Tuân thủ nguyên tắc **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

**7.1. Xác thực thành công**

*   IAM nhận kết quả xác thực thành công từ IdP
*   User được xác định hợp lệ trong Tenant
*   Sẵn sàng cho các bước:
    *   Cấp token
    *   Đánh giá phân quyền

**7.2. Xác thực thất bại**

*   User không được xác thực
*   Không thiết lập phiên đăng nhập
*   Thông tin thất bại được ghi nhận (theo chính sách audit)

**8\. Phạm vi chức năng**

**8.1. Tích hợp IdP**

*   Hỗ trợ tích hợp nhiều IdP
*   Mỗi Tenant có thể gắn với một hoặc nhiều IdP

**8.2. Uỷ quyền xác thực**

*   Chuyển hướng hoặc gửi yêu cầu xác thực đến IdP
*   Nhận và xử lý phản hồi xác thực

**8.3. Ánh xạ định danh sau xác thực**

*   Ánh xạ định danh IdP → User trong IAM
*   Không tạo hoặc cập nhật User trong bước xác thực

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Identity Provider ID

Định danh IdP

**2**

Tenant ID

Tenant áp dụng

**3**

External User Identifier

Định danh User từ IdP

**4**

Authentication Result

Success / Failed

**5**

Authentication Time

Thời điểm xác thực

**6**

Failure Reason

Lý do thất bại (nếu có)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTH‑01‑01

IAM **không lưu trữ credential** của User

**2**

BR‑AUTH‑01‑02

Mọi xác thực phải được thực hiện thông qua IdP

**3**

BR‑AUTH‑01‑03

Xác thực thành công **không đồng nghĩa** với được cấp quyền

**4**

BR‑AUTH‑01‑04

User phải tồn tại và hợp lệ trong IAM

**5**

BR‑AUTH‑01‑05

User thuộc Tenant _Suspended_ không được xác thực

**6**

BR‑AUTH‑01‑06

Kết quả xác thực phải được ghi nhận theo chính sách audit

**7**

BR‑AUTH‑01‑07

Không cho phép xác thực chéo Tenant

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  User khởi tạo yêu cầu đăng nhập
2.  IAM xác định Tenant và IdP tương ứng
3.  IAM chuyển yêu cầu xác thực tới IdP
4.  IdP thực hiện xác thực User
5.  IdP trả kết quả xác thực cho IAM
6.  IAM:
    *   Xác định User trong IAM
    *   Kiểm tra trạng thái User và Tenant
7.  Trả kết quả xác thực

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

IdP không khả dụng

Trả lỗi _Authentication Service Unavailable_

**2**

Xác thực thất bại

Trả lỗi _Authentication Failed_

**3**

User không tồn tại

Trả lỗi _User Not Found_

**4**

Tenant bị Suspend

Từ chối xác thực

**5**

Lỗi hệ thống

Trả lỗi _Internal Server Error_

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Tuân thủ chuẩn xác thực

**2**

Availability

Hỗ trợ IdP HA

**3**

Audit

Ghi nhận hoạt động xác thực

**4**

Interoperability

Hỗ trợ tích hợp đa IdP

**14\. Ngoài phạm vi (Out of Scope)**

*   Thiết kế chi tiết giao thức xác thực
*   Quản lý credential, MFA
*   Cấp token hoặc phân quyền

**15\. Ghi chú**

*   AUTH‑01 là **entry point của Authentication**
*   Mọi cơ chế Token, SSO, Authorization **đều phụ thuộc AUTH‑01**
*   Authentication **luôn đứng trước Authorization**

### AUTHN‑02 – IdP Integration Identity – Authentication Flow & Session Establishment

_(Luồng Xác thực & Thiết lập Phiên làm việc)_

**1\. Mã chức năng**

**AUTHN‑02**

**2\. Tên chức năng**

**IdP Integration Identity – Authentication Flow & Session Establishment**

**3\. Mô tả tổng quát**

Chức năng **Authentication Flow & Session Establishment** mô tả **trình tự xử lý xác thực người dùng sau khi nhận kết quả xác thực từ Identity Provider (IdP)** và **thiết lập ngữ cảnh phiên làm việc (session)** trong hệ thống IAM.

Chức năng này chịu trách nhiệm:

*   Tiếp nhận kết quả xác thực từ **AUTH‑01**
*   Kiểm tra tính hợp lệ của User và Tenant
*   Thiết lập **authentication context** và **session logic**
*   Chuẩn bị dữ liệu đầu vào cho việc **cấp token và phân quyền**

AUTH‑02 **không thực hiện xác thực credential**, mà chỉ xử lý **hậu xác thực (post‑authentication)**.

**4\. Mục tiêu nghiệp vụ**

*   Chuẩn hoá luồng xử lý sau xác thực
*   Đảm bảo chỉ User và Tenant hợp lệ mới được thiết lập phiên
*   Thiết lập session nhất quán, an toàn
*   Tạo nền tảng cho Token Management và Authorization

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

User

Thực hiện đăng nhập

**2**

IAM System

Xử lý authentication flow

**3**

Identity Provider (IdP)

Cung cấp kết quả xác thực

**4**

Auditor (read‑only)

Giám sát hoạt động xác thực

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   AUTH‑01 đã được thực hiện
*   IdP trả kết quả xác thực hợp lệ
*   Tenant tồn tại và ở trạng thái _Active_
*   User tồn tại hợp lệ trong IAM
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

**7.1. Authentication thành công**

*   Authentication Context được thiết lập
*   Session hợp lệ được tạo
*   Sẵn sàng cho:
    *   Token Issuance
    *   Authorization Evaluation

**7.2. Authentication thất bại**

*   Session **không** được thiết lập
*   Không cấp token
*   Sự kiện thất bại được ghi nhận

**8\. Phạm vi chức năng**

**8.1. Xử lý kết quả xác thực**

*   Nhận assertion / response từ IdP
*   Kiểm tra trạng thái xác thực

**8.2. Kiểm tra User & Tenant**

*   Kiểm tra User:
    *   Tồn tại
    *   Trạng thái _Active_
*   Kiểm tra Tenant:
    *   Tồn tại
    *   Trạng thái _Active_

**8.3. Thiết lập Authentication Context**

*   Xác định:
    *   User ID
    *   Tenant ID
    *   IdP sử dụng
    *   Thời điểm xác thực

**8.4. Thiết lập Session**

*   Tạo session logic cho User
*   Gắn session với User và Tenant
*   Chuẩn bị cho cấp token

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Authentication ID

Định danh phiên xác thực

**2**

User ID

User đã xác thực

**3**

Tenant ID

Tenant tương ứng

**4**

Identity Provider ID

IdP đã sử dụng

**5**

Authentication Time

Thời điểm xác thực

**6**

Session ID

Định danh phiên

**7**

Session Status

Active / Invalid

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTH‑02‑01

Chỉ thiết lập session khi xác thực **thành công**

**2**

BR‑AUTH‑02‑02

User _Suspended_ không được thiết lập session

**3**

BR‑AUTH‑02‑03

Tenant _Suspended_ không được thiết lập session

**4**

BR‑AUTH‑02‑04

Session phải gắn với **User và Tenant cụ thể**

**5**

BR‑AUTH‑02‑05

Authentication Context là **bắt buộc** cho mọi session

**6**

BR‑AUTH‑02‑06

Không thiết lập session nếu vi phạm Tenant Isolation

**7**

BR‑AUTH‑02‑07

Mọi sự kiện authentication phải được **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  IAM nhận kết quả xác thực thành công từ IdP
2.  IAM xác định User trong hệ thống
3.  IAM kiểm tra:
    *   Trạng thái User
    *   Trạng thái Tenant
4.  IAM thiết lập Authentication Context
5.  IAM tạo Session cho User
6.  Ghi nhận Audit Log
7.  Chuyển sang bước Token Issuance

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

User không tồn tại

Từ chối thiết lập session

**2**

User bị Suspend

Từ chối thiết lập session

**3**

Tenant bị Suspend

Từ chối thiết lập session

**4**

Vi phạm Tenant Isolation

Từ chối xác thực

**5**

Lỗi hệ thống

Trả lỗi _Internal Server Error_

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Session chỉ tạo cho User hợp lệ

**2**

Consistency

Session gắn chặt User & Tenant

**3**

Audit

Ghi nhận đầy đủ sự kiện

**4**

Reliability

Xử lý nhất quán

**14\. Ngoài phạm vi (Out of Scope)**

*   Cấp access token / refresh token
*   Quản lý session timeout chi tiết
*   Đánh giá quyền truy cập (Authorization)

**15\. Ghi chú**

*   AUTH‑02 **luôn theo sau AUTH‑01**
*   Là cầu nối giữa:
    *   Authentication
    *   Token Management
    *   Authorization
*   Mọi request sau đăng nhập **đều phụ thuộc session được thiết lập tại AUTH‑02**

### AUTHN‑03 – Login / Logout Token – Issuance & Lifecycle Management

_(Cấp Token & Quản lý Vòng đời Token)_

**1\. Mã chức năng**

**AUTHN‑03**

**2\. Tên chức năng**

**Login / Logout Token – Token Issuance & Lifecycle Management**

**3\. Mô tả tổng quát**

Chức năng **Token Issuance & Lifecycle Management** chịu trách nhiệm **cấp phát, quản lý hiệu lực và kiểm soát vòng đời của token truy cập** cho User sau khi xác thực và thiết lập session thành công.

Token là **bằng chứng truy cập (access proof)** để:

*   Xác định danh tính User
*   Xác định Tenant
*   Truyền tải ngữ cảnh xác thực tới các dịch vụ nghiệp vụ
*   Thực thi kiểm soát truy cập (Authorization)

Chức năng này đảm bảo token:

*   Được cấp **đúng đối tượng, đúng ngữ cảnh**
*   Có vòng đời rõ ràng
*   Bị vô hiệu hoá ngay khi User hoặc Tenant không còn hợp lệ

**4\. Mục tiêu nghiệp vụ**

*   Cấp token an toàn và nhất quán
*   Kiểm soát vòng đời token theo chính sách
*   Ngăn chặn việc sử dụng token không hợp lệ
*   Hỗ trợ vận hành, bảo mật và audit

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

User

Nhận và sử dụng token

**2**

IAM System

Cấp và quản lý token

**3**

Business Service

Xác thực token khi xử lý request

**4**

Auditor (read‑only)

Giám sát hoạt động token

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   AUTH‑02 đã thiết lập session hợp lệ
*   User tồn tại và ở trạng thái _Active_
*   Tenant tồn tại và ở trạng thái _Active_
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

**7.1. Token được cấp thành công**

*   Token hợp lệ được phát hành
*   Token gắn với User, Tenant và Session
*   Token có thời hạn hiệu lực xác định

**7.2. Token bị từ chối / vô hiệu**

*   Token không được cấp hoặc bị huỷ hiệu lực
*   Token không thể được sử dụng để truy cập hệ thống
*   Sự kiện được ghi nhận để audit

**8\. Phạm vi chức năng**

**8.1. Token Issuance**

*   Cấp token sau khi session hợp lệ được thiết lập
*   Token chứa ngữ cảnh xác thực cần thiết

**8.2. Token Validation**

*   Kiểm tra tính hợp lệ của token khi sử dụng
*   Kiểm tra trạng thái User và Tenant tại thời điểm sử dụng

**8.3. Token Expiration**

*   Token hết hạn theo thời gian cấu hình
*   Token hết hạn không được sử dụng lại

**8.4. Token Revocation**

*   Thu hồi token khi:
    *   User bị Suspend
    *   Tenant bị Suspend
    *   Session bị vô hiệu hoá

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Token ID

Định danh token

**2**

Token Type

Access Token (theo phạm vi SRS)

**3**

User ID

User được cấp token

**4**

Tenant ID

Tenant tương ứng

**5**

Session ID

Session liên kết

**6**

Issued Time

Thời điểm cấp token

**7**

Expiration Time

Thời điểm hết hạn

**8**

Token Status

Active / Expired / Revoked

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTH‑03‑01

Token chỉ được cấp khi session hợp lệ

**2**

BR‑AUTH‑03‑02

Token **bắt buộc** gắn với User và Tenant

**3**

BR‑AUTH‑03‑03

Token hết hạn không được sử dụng

**4**

BR‑AUTH‑03‑04

Token của User _Suspended_ phải bị vô hiệu hoá

**5**

BR‑AUTH‑03‑05

Token của Tenant _Suspended_ phải bị vô hiệu hoá

**6**

BR‑AUTH‑03‑06

Token không được sử dụng chéo Tenant

**7**

BR‑AUTH‑03‑07

Mọi sự kiện token phải được **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. Token Issuance**

1.  IAM nhận yêu cầu cấp token
2.  IAM kiểm tra:
    *   Session hợp lệ
    *   Trạng thái User
    *   Trạng thái Tenant
3.  IAM tạo token
4.  Gắn token với User, Tenant và Session
5.  Ghi nhận Audit Log
6.  Trả token cho User

**11.2. Token Validation (khi sử dụng)**

1.  Business Service nhận request kèm token
2.  Hệ thống kiểm tra:
    *   Tính hợp lệ token
    *   Thời hạn hiệu lực
    *   Trạng thái User & Tenant
3.  Cho phép hoặc từ chối request

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

Session không hợp lệ

Từ chối cấp token

**2**

Token hết hạn

Từ chối request

**3**

Token bị thu hồi

Từ chối request

**4**

User / Tenant bị Suspend

Vô hiệu token

**5**

Lỗi hệ thống

Trả lỗi _Internal Server Error_

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Token an toàn, không giả mạo

**2**

Performance

Validate token nhanh

**3**

Audit

Ghi nhận vòng đời token

**4**

Reliability

Token nhất quán

**14\. Ngoài phạm vi (Out of Scope)**

*   Thiết kế chi tiết JWT / opaque token
*   Refresh token
*   Token introspection chi tiết
*   Cơ chế mã hoá token

**15\. Ghi chú**

*   AUTH‑03 **phụ thuộc trực tiếp AUTH‑02**
*   Token là **đầu vào bắt buộc** cho Authorization
*   Vô hiệu token là biện pháp bảo mật trọng yếu

### AUTHN‑04 – Login / Logout Token – Single Sign‑On (SSO)

_(Đăng nhập Một lần – Dùng nhiều hệ thống)_

**1\. Mã chức năng**

**AUTHN‑04**

**2\. Tên chức năng**

**Login / Logout Token – Single Sign‑On (SSO)**

**3\. Mô tả tổng quát**

Chức năng **Single Sign‑On (SSO)** cho phép **User chỉ cần xác thực một lần duy nhất** thông qua **Identity Provider (IdP)** để có thể truy cập **nhiều ứng dụng / dịch vụ** thuộc cùng hệ sinh thái SAE, trong phạm vi **Tenant hợp lệ**.

SSO dựa trên:

*   Kết quả xác thực từ **AUTH‑01**
*   Session đã được thiết lập trong **AUTH‑02**
*   Token được cấp và quản lý theo **AUTH‑03**

Chức năng này giúp cải thiện **trải nghiệm người dùng**, đồng thời vẫn đảm bảo **bảo mật, kiểm soát truy cập và Tenant Isolation**.

**4\. Mục tiêu nghiệp vụ**

*   Giảm số lần đăng nhập cho User
*   Tăng trải nghiệm sử dụng hệ thống
*   Đảm bảo xác thực nhất quán giữa các ứng dụng
*   Hỗ trợ mô hình Enterprise Application Landscape

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

User

Truy cập nhiều ứng dụng

**2**

Identity Provider (IdP)

Xác thực tập trung

**3**

IAM System

Điều phối SSO

**4**

Client Application

Ứng dụng tiêu thụ SSO

**5**

Auditor (read‑only)

Giám sát hoạt động SSO

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   IdP hỗ trợ cơ chế SSO
*   User đã xác thực thành công thông qua IdP
*   Session hợp lệ đã được thiết lập (AUTH‑02)
*   User và Tenant ở trạng thái _Active_
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

**7.1. SSO thành công**

*   User không cần xác thực lại khi truy cập ứng dụng khác
*   Token hợp lệ được cấp cho từng ứng dụng (nếu cần)
*   Ngữ cảnh User và Tenant được duy trì nhất quán

**7.2. SSO thất bại**

*   User bị yêu cầu xác thực lại
*   Không thiết lập session / token mới
*   Sự kiện được ghi nhận (nếu áp dụng)

**8\. Phạm vi chức năng**

**8.1. SSO trong cùng Tenant**

*   SSO chỉ áp dụng trong phạm vi **một Tenant**
*   Không cho phép SSO chéo Tenant

**8.2. Session Reuse**

*   Tái sử dụng session đã được thiết lập
*   Không tạo session mới nếu session hiện tại còn hợp lệ

**8.3. Token Re‑issuance**

*   Cấp token mới cho ứng dụng khác dựa trên session hiện có
*   Áp dụng chính sách token theo Tenant

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

SSO Session ID

Định danh phiên SSO

**2**

User ID

User đã xác thực

**3**

Tenant ID

Tenant áp dụng

**4**

Identity Provider ID

IdP sử dụng

**5**

Client Application ID

Ứng dụng truy cập

**6**

SSO Time

Thời điểm SSO

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTH‑04‑01

SSO chỉ áp dụng cho User đã xác thực

**2**

BR‑AUTH‑04‑02

SSO **không cho phép** truy cập chéo Tenant

**3**

BR‑AUTH‑04‑03

Session hết hạn → SSO không hợp lệ

**4**

BR‑AUTH‑04‑04

User _Suspended_ không được sử dụng SSO

**5**

BR‑AUTH‑04‑05

Tenant _Suspended_ không được sử dụng SSO

**6**

BR‑AUTH‑04‑06

Token cấp qua SSO tuân thủ **AUTH‑03**

**7**

BR‑AUTH‑04‑07

Hoạt động SSO phải được **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  User truy cập một Client Application
2.  Application chuyển User tới IAM / IdP
3.  IAM kiểm tra session hiện có
4.  Session hợp lệ → bỏ qua bước xác thực
5.  IAM cấp token phù hợp cho Application
6.  User được truy cập Application

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

Không có session

Yêu cầu xác thực lại

**2**

Session hết hạn

Yêu cầu xác thực lại

**3**

User / Tenant bị Suspend

Từ chối SSO

**4**

Vi phạm Tenant Isolation

Từ chối truy cập

**5**

Lỗi hệ thống

Trả lỗi _Internal Server Error_

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Usability

Giảm số lần đăng nhập

**2**

Security

Không chia sẻ session chéo Tenant

**3**

Performance

SSO phản hồi nhanh

**4**

Audit

Theo dõi truy cập đa ứng dụng

**14\. Ngoài phạm vi (Out of Scope)**

*   Cross‑Tenant SSO
*   Federation giữa các hệ IAM khác
*   SSO cho hệ thống bên thứ ba không tích hợp IAM

**15\. Ghi chú**

*   AUTH‑04 **phụ thuộc AUTH‑01 → AUTH‑03**
*   SSO **không thay thế Authorization**
*   Mỗi ứng dụng vẫn phải đánh giá quyền truy cập riêng

### AUTHN‑05 – Login / Logout Token – Logout & Session Termination

_(Đăng xuất & Kết thúc Phiên làm việc)_

**1\. Mã chức năng**

**AUTHN‑05**

**2\. Tên chức năng**

**Login / Logout Token – Logout & Session Termination**

**3\. Mô tả tổng quát**

Chức năng **Logout & Session Termination** cho phép **kết thúc chủ động hoặc bắt buộc phiên làm việc (session)** của User trong hệ thống IAM, đồng thời **vô hiệu hoá toàn bộ token liên quan** nhằm ngăn chặn truy cập tiếp tục sau khi đăng xuất.

Chức năng này đảm bảo rằng:

*   User không thể tiếp tục sử dụng hệ thống sau khi logout
*   Session và token không còn hiệu lực ngay lập tức
*   Môi trường SSO được xử lý nhất quán và an toàn

AUTH‑05 là **bước kết thúc vòng đời xác thực**, bổ sung hoàn chỉnh cho chuỗi **AUTH‑01 → AUTH‑04**.

**4\. Mục tiêu nghiệp vụ**

*   Cho phép User đăng xuất an toàn
*   Hỗ trợ quản trị viên kết thúc phiên cưỡng bức
*   Đảm bảo token và session không bị lạm dụng
*   Hỗ trợ tuân thủ và audit an ninh

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

User

Chủ động đăng xuất

**2**

IAM System

Thực hiện kết thúc session

**3**

Super Admin

Kết thúc session cưỡng bức

**4**

Client Application

Gửi yêu cầu logout

**5**

Auditor (read‑only)

Giám sát hoạt động logout

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Session hợp lệ đang tồn tại
*   User đã đăng nhập thành công trước đó
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

**7.1. Logout thành công**

*   Session bị vô hiệu hoá
*   Toàn bộ token gắn với session bị thu hồi
*   User không thể tiếp tục truy cập hệ thống

**7.2. Logout thất bại**

*   Session vẫn được giữ nguyên
*   Sự kiện lỗi được ghi nhận

**8\. Phạm vi chức năng**

**8.1. User‑initiated Logout**

*   User chủ động yêu cầu đăng xuất
*   Áp dụng cho session hiện tại

**8.2. Forced Session Termination**

*   Quản trị viên kết thúc session của User
*   Áp dụng cho một hoặc nhiều session

**8.3. SSO Logout Handling**

*   Đảm bảo session SSO bị vô hiệu hoá
*   Ngăn chặn tái sử dụng session trong các ứng dụng khác

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Session ID

Phiên bị kết thúc

**2**

User ID

User liên quan

**3**

Tenant ID

Tenant tương ứng

**4**

Termination Type

User / Forced

**5**

Termination Reason

Lý do (nếu có)

**6**

Termination Time

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTH‑05‑01

Logout phải vô hiệu hoá session ngay lập tức

**2**

BR‑AUTH‑05‑02

Token gắn với session phải bị **thu hồi**

**3**

BR‑AUTH‑05‑03

Session đã kết thúc không được tái sử dụng

**4**

BR‑AUTH‑05‑04

Forced logout yêu cầu quyền quản trị

**5**

BR‑AUTH‑05‑05

Logout phải tuân thủ Tenant Isolation

**6**

BR‑AUTH‑05‑06

Logout SSO phải áp dụng cho toàn bộ ứng dụng

**7**

BR‑AUTH‑05‑07

Mọi sự kiện logout phải được **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. User‑initiated Logout**

1.  User chọn **Logout**
2.  Client Application gửi yêu cầu logout tới IAM
3.  IAM xác định session hiện tại
4.  IAM vô hiệu hoá session
5.  IAM thu hồi toàn bộ token liên quan
6.  Ghi nhận Audit Log
7.  Trả kết quả thành công

**11.2. Forced Session Termination**

1.  Admin chọn User / Session cần kết thúc
2.  IAM kiểm tra quyền của Admin
3.  IAM vô hiệu hoá session
4.  IAM thu hồi token liên quan
5.  Ghi nhận Audit Log
6.  Trả kết quả thành công

**12\. Luồng thay thế / ngoại lệ (Alternative & Exception Flows)**

**#**

**Trường hợp**

**Mô tả xử lý**

**1**

Session không tồn tại

Trả lỗi _Session Not Found_

**2**

Không đủ quyền

Từ chối thao tác

**3**

Token đã hết hạn

Vẫn kết thúc session

**4**

Lỗi hệ thống

Trả lỗi _Internal Server Error_

**13\. Yêu cầu phi chức năng liên quan (NFR – liên kết)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Vô hiệu hoá truy cập tức thời

**2**

Consistency

Session & token đồng bộ

**3**

Audit

Ghi nhận đầy đủ sự kiện

**4**

Availability

Logout phản hồi nhanh

**14\. Ngoài phạm vi (Out of Scope)**

*   Global logout giữa các IdP khác nhau
*   Quản lý cookie chi tiết
*   Timeout tự động (idle / absolute)

**15\. Ghi chú**

*   AUTH‑05 là **bước kết thúc chính thức của Authentication Lifecycle**
*   Logout là biện pháp bảo mật quan trọng, đặc biệt trong môi trường SSO
*   Mọi request sau logout phải bị từ chối

### TOK‑01 – Token Issuance – Issue Access Token

_(Phát hành Access Token cho Truy cập Hệ thống)_

**1\. Mã chức năng**

**TOK‑01**

**2\. Tên chức năng**

**Token Issuance – Issue Access Token**

**3\. Mô tả tổng quát**

Chức năng **Issue Access Token** chịu trách nhiệm **phát hành Access Token** cho Client / User **sau khi xác thực thành công**, phục vụ cho việc **truy cập tài nguyên được bảo vệ** trong hệ thống.

Access Token:

*   Đại diện cho **Identity đã được xác thực**
*   Mang **Security Claims tối thiểu cần thiết**
*   Được sử dụng bởi:
    *   API Gateway
    *   Policy Enforcement Point (PEP)
*   **Không tự ra quyết định ALLOW / DENY**
*   Là **đầu vào bắt buộc** cho Authorization Engine (AUTHZ‑01)

TOK‑01 là **ranh giới cứng giữa Authentication và Authorization**.

**4\. Mục tiêu nghiệp vụ**

*   Phát hành Access Token an toàn, chuẩn hoá
*   Đảm bảo Token mang đủ ngữ cảnh để Authorization hoạt động
*   Hỗ trợ kiến trúc **Zero‑Trust & Stateless API**
*   Đáp ứng yêu cầu bảo mật, audit và compliance

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Identity Provider (IdP)

Phát hành Access Token

**2**

Authentication Service

Kích hoạt Token Issuance

**3**

Client / Application

Nhận & sử dụng Token

**4**

API Gateway / PEP

Tiêu thụ Token

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   User / Client đã xác thực thành công
*   Phương thức xác thực hợp lệ (password, MFA, SSO, …)
*   Client được đăng ký hợp lệ
*   Tenant Context hợp lệ
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   Access Token được phát hành thành công
*   Token được ký (signed) và có thời hạn
*   Token được trả về cho Client
*   (Tuỳ cấu hình) Ghi Audit Log
*   Không phát sinh Authorization Decision

**8\. Phạm vi chức năng**

**8.1. Thu thập Token Context**

Bao gồm:

*   User ID / Client ID
*   Tenant ID
*   Authentication Context (MFA, method, level)
*   Token Audience (aud)
*   Scope (nếu áp dụng)

**8.2. Sinh Access Token**

*   Token format:
    *   JWT (khuyến nghị)
    *   Hoặc opaque token
*   Token được:
    *   Ký số (asymmetric / symmetric)
    *   Gắn thời hạn ngắn (short‑lived)

**8.3. Gắn Security Claims**

Access Token có thể chứa:

*   sub – Subject (User / Client)
*   tenant\_id
*   iss – Issuer
*   aud – Audience
*   iat, exp
*   Authentication Level (optional)

⚠️ **Không nhúng Role / Permission chi tiết nếu Authorization tập trung**

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Token ID (jti)

Định danh Token

**2**

Subject (sub)

User / Client

**3**

Tenant ID

Tenant

**4**

Issuer (iss)

IdP

**5**

Audience (aud)

API / Gateway

**6**

Issued At (iat)

Thời điểm

**7**

Expiry (exp)

Hết hạn

**8**

Token Type

Bearer

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑TOK‑01‑01

Chỉ phát hành Token sau xác thực thành công

**2**

BR‑TOK‑01‑02

Access Token **phải có thời hạn ngắn**

**3**

BR‑TOK‑01‑03

Token **bắt buộc gắn Tenant ID**

**4**

BR‑TOK‑01‑04

Token phải được ký hợp lệ

**5**

BR‑TOK‑01‑05

Token không chứa secret

**6**

BR‑TOK‑01‑06

Token không tự quyết định quyền

**7**

BR‑TOK‑01‑07

Lỗi phát hành → **không cấp Token**

**8**

BR‑TOK‑01‑08

Có thể ghi Audit Log

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Authentication Service xác thực User / Client
2.  Gửi yêu cầu phát hành Access Token
3.  IdP thu thập Token Context
4.  Sinh Access Token
5.  Ký Token & gắn expiry
6.  Trả Token cho Client

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Xác thực thất bại

Không cấp Token

**2**

Client không hợp lệ

Từ chối

**3**

Tenant không hợp lệ

Từ chối

**4**

Lỗi ký Token

Từ chối

**5**

Lỗi hệ thống

Từ chối

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Token ký, ngắn hạn

**2**

Performance

Phát hành nhanh

**3**

Scalability

Hỗ trợ lượng lớn Token

**4**

Audit

Truy vết phát hành

**14\. Ngoài phạm vi (Out of Scope)**

*   Authorization (RBAC / ABAC)
*   Enforcement tại API
*   Refresh Token
*   Token Revocation
*   Session Management

**15\. Ghi chú**

*   **TOK‑01 kết thúc Authentication, bắt đầu Authorization**
*   Token càng “mỏng” → Authorization càng an toàn
*   Thiết kế Token sai → **rủi ro bảo mật hệ thống**

### TOK‑02 – Token Issuance – Issue Refresh Token

_(Phát hành Refresh Token để Gia hạn Truy cập)_

**1\. Mã chức năng**

**TOK‑02**

**2\. Tên chức năng**

**Token Issuance – Issue Refresh Token**

**3\. Mô tả tổng quát**

Chức năng **Issue Refresh Token** chịu trách nhiệm **phát hành Refresh Token** cho Client **sau khi xác thực thành công**, nhằm cho phép **gia hạn Access Token mà không cần xác thực lại người dùng**.

Refresh Token:

*   Có **thời hạn dài hơn** Access Token
*   **Chỉ dùng để xin Access Token mới**
*   **Không được dùng trực tiếp** để truy cập tài nguyên
*   Được quản lý chặt chẽ để giảm rủi ro bị lạm dụng

TOK‑02 giúp cân bằng giữa:

*   **Trải nghiệm người dùng (UX)**
*   **Mức độ bảo mật cao (Security)**

**4\. Mục tiêu nghiệp vụ**

*   Giảm số lần người dùng phải đăng nhập lại
*   Duy trì phiên truy cập an toàn, kiểm soát được
*   Hỗ trợ kiến trúc **OAuth2 / OIDC / Zero‑Trust**
*   Tách biệt rõ vòng đời Access Token và Refresh Token

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Identity Provider (IdP)

Phát hành Refresh Token

**2**

Authentication Service

Kích hoạt phát hành

**3**

Client / Application

Lưu trữ & sử dụng Refresh Token

**4**

Token Service

Xử lý gia hạn Token

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   User / Client đã xác thực thành công
*   Client được phép sử dụng Refresh Token (confidential / trusted client)
*   Tenant Context hợp lệ
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   Refresh Token được phát hành thành công
*   Token được lưu trữ an toàn (server‑side hoặc secure storage)
*   Refresh Token gắn với:
    *   User / Client
    *   Tenant
    *   Session / Device (nếu áp dụng)
*   (Tuỳ cấu hình) Ghi Audit Log

**8\. Phạm vi chức năng**

**8.1. Điều kiện phát hành Refresh Token**

Refresh Token **chỉ được phát hành** khi:

*   Luồng xác thực cho phép (Authorization Code, Device Flow, …)
*   Client đủ mức độ tin cậy
*   Chính sách bảo mật cho phép

**8.2. Sinh Refresh Token**

*   Token format:
    *   **Opaque token** (khuyến nghị)
*   Token có:
    *   Thời hạn dài (days / weeks)
    *   Định danh duy nhất (jti)
*   Không chứa thông tin nghiệp vụ

**8.3. Gắn ràng buộc bảo mật**

Refresh Token có thể được ràng buộc với:

*   Client ID
*   Tenant ID
*   User ID
*   Device / Session ID
*   IP / Fingerprint (tuỳ chính sách)

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Refresh Token ID (jti)

Định danh

**2**

Subject (sub)

User / Client

**3**

Tenant ID

Tenant

**4**

Client ID

Ứng dụng

**5**

Issued At (iat)

Thời điểm

**6**

Expiry (exp)

Hết hạn

**7**

Token Status

Active / Revoked

**8**

Binding Info

Device / Session

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑TOK‑02‑01

Chỉ phát hành Refresh Token cho Client hợp lệ

**2**

BR‑TOK‑02‑02

Refresh Token **không dùng để truy cập API**

**3**

BR‑TOK‑02‑03

Refresh Token phải được lưu trữ an toàn

**4**

BR‑TOK‑02‑04

Refresh Token **phải có thời hạn**

**5**

BR‑TOK‑02‑05

Refresh Token gắn Tenant ID

**6**

BR‑TOK‑02‑06

Có thể áp dụng **token rotation**

**7**

BR‑TOK‑02‑07

Lỗi phát hành → không cấp Token

**8**

BR‑TOK‑02‑08

Có thể ghi Audit Log

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  User / Client hoàn tất xác thực
2.  Authentication Service yêu cầu phát hành Token
3.  IdP xác định Client có được cấp Refresh Token hay không
4.  Sinh Refresh Token
5.  Lưu Refresh Token (secure store)
6.  Trả Refresh Token cho Client

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Client không được phép

Không cấp Refresh Token

**2**

Tenant không hợp lệ

Từ chối

**3**

Lỗi lưu Token

Từ chối

**4**

Lỗi hệ thống

Từ chối

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Opaque, lưu trữ an toàn

**2**

Reliability

Không mất Token

**3**

Scalability

Hỗ trợ nhiều phiên

**4**

Audit

Truy vết phát hành

**14\. Ngoài phạm vi (Out of Scope)**

*   Refresh Token sử dụng để gia hạn (TOK‑03 / TOK‑05)
*   Token Revocation
*   Authorization (RBAC / ABAC)
*   Enforcement tại API
*   UI/UX chi tiết

**15\. Ghi chú**

*   **Refresh Token là tài sản bảo mật nhạy cảm nhất**
*   Lộ Refresh Token → rủi ro nghiêm trọng
*   Thiết kế đúng Refresh Token → hệ thống vừa **an toàn vừa thân thiện**

### TOK‑03 – Token Validation – Signature Validation

_(Xác thực Chữ ký Token – Token Security Core)_

**1\. Mã chức năng**

**TOK‑03**

**2\. Tên chức năng**

**Token Validation – Signature Validation**

**3\. Mô tả tổng quát**

Chức năng **Signature Validation** chịu trách nhiệm **xác thực chữ ký số của Token** nhằm đảm bảo rằng:

*   Token **được phát hành bởi Issuer hợp lệ**
*   Token **không bị sửa đổi (tampered)**
*   Token **đáp ứng chuẩn mã hoá & thuật toán cho phép**

TOK‑03 là **lớp kiểm tra bảo mật bắt buộc đầu tiên** khi xử lý Token, và là **điều kiện tiên quyết** trước khi:

*   Validate Claim (issuer, audience, expiry, …)
*   Thực hiện Authorization (AUTHZ)
*   Cho phép truy cập tài nguyên

**4\. Mục tiêu nghiệp vụ**

*   Đảm bảo tính **toàn vẹn và xác thực** của Token
*   Ngăn chặn Token giả mạo hoặc bị chỉnh sửa
*   Chuẩn hoá cơ chế kiểm tra Token cho toàn hệ thống
*   Đáp ứng yêu cầu **Zero‑Trust & Compliance**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

API Gateway / PEP

Gọi Signature Validation

**2**

Token Validation Service

Thực hiện kiểm tra chữ ký

**3**

Identity Provider (IdP)

Cung cấp public key / JWKS

**4**

Authorization Engine

Chỉ xử lý Token hợp lệ

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Token được gửi kèm request (Authorization Header)
*   Token ở định dạng hợp lệ (JWT / Opaque\*)
*   Hệ thống có khả năng truy xuất khoá xác thực
*   Tuân thủ **Tenant Isolation (IDM‑04)**

\* Opaque token: Signature Validation có thể được thực hiện gián tiếp qua introspection (ngoài phạm vi TOK‑03).

**7\. Điều kiện hậu (Post‑conditions)**

*   Token được xác nhận **Valid / Invalid (Signature)**
*   Kết quả validation được gắn vào Security Context
*   Token Invalid → **dừng xử lý request**
*   Không thay đổi trạng thái Token hay Session

**8\. Phạm vi chức năng**

**8.1. Nhận diện loại Token**

*   JWT (JWS – JSON Web Signature)
*   Phân biệt:
    *   Signed (JWS)
    *   Encrypted (JWE – nếu có, giải mã trước)

**8.2. Kiểm tra thuật toán chữ ký**

*   Chỉ cho phép algorithm nằm trong **allow‑list**
    *   Ví dụ: RS256, ES256
*   **Từ chối tuyệt đối**:
    *   alg = none
    *   Thuật toán yếu / không được cấu hình

**8.3. Xác thực chữ ký**

*   Truy xuất public key:
    *   JWKS endpoint
    *   Key cache nội bộ
*   Kiểm tra:
    *   Chữ ký hợp lệ
    *   Key ID (kid) tồn tại & hợp lệ

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Token

Chuỗi Token

**2**

Token Type

JWT / Opaque

**3**

Signature Algorithm

RS256 / ES256 / …

**4**

Key ID (kid)

Định danh khoá

**5**

Public Key

Khoá xác thực

**6**

Validation Result

Valid / Invalid

**7**

Validation Time

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑TOK‑03‑01

Token **bắt buộc phải được ký**

**2**

BR‑TOK‑03‑02

Thuật toán ký phải nằm trong allow‑list

**3**

BR‑TOK‑03‑03

Chữ ký không hợp lệ → **Token Invalid**

**4**

BR‑TOK‑03‑04

Không xác thực chữ ký → **không xử lý tiếp**

**5**

BR‑TOK‑03‑05

Lỗi xác thực → **fail‑secure (deny)**

**6**

BR‑TOK‑03‑06

Signature Validation **độc lập với Claim Validation**

**7**

BR‑TOK‑03‑07

Không ghi đè kết quả Signature Validation

**8**

BR‑TOK‑03‑08

Có thể ghi Audit Log

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  API Gateway / PEP nhận request
2.  Trích xuất Token từ header
3.  Gọi **TOK‑03 – Signature Validation**
4.  Xác định thuật toán & kid
5.  Truy xuất public key
6.  Xác thực chữ ký
7.  Nếu hợp lệ → chuyển sang Claim Validation
8.  Nếu không hợp lệ → **Reject request**

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Token thiếu chữ ký

Invalid

**2**

Algorithm không cho phép

Invalid

**3**

kid không tồn tại

Invalid

**4**

Public key không khớp

Invalid

**5**

Lỗi hệ thống

Invalid (fail‑secure)

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Fail‑secure tuyệt đối

**2**

Performance

Xác thực nhanh, có cache

**3**

Availability

JWKS fallback

**4**

Audit

Truy vết lỗi chữ ký

**14\. Ngoài phạm vi (Out of Scope)**

*   Claim Validation (issuer, audience, exp, …)
*   Token Revocation
*   Token Rotation
*   Authorization (RBAC / ABAC)
*   Enforcement logic

**15\. Ghi chú**

*   **Signature Validation là “cổng an ninh số 1” của Token**
*   Bỏ qua bước này → **toàn bộ IAM mất an toàn**
*   Nên thực hiện **trước mọi xử lý nghiệp vụ khác**

### TOK‑04 – Token Validation – Expiration Check

_(Kiểm tra Hiệu lực Thời gian của Token)_

**1\. Mã chức năng**

**TOK‑04**

**2\. Tên chức năng**

**Token Validation – Expiration Check**

**3\. Mô tả tổng quát**

Chức năng **Expiration Check** chịu trách nhiệm **kiểm tra hiệu lực thời gian của Token**, đảm bảo rằng Token:

*   Chưa hết hạn (exp)
*   Không được sử dụng trước thời điểm cho phép (nbf – nếu có)
*   Có thời gian phát hành hợp lệ (iat)

TOK‑04 là **bước kiểm tra bắt buộc sau Signature Validation (TOK‑03)** và **trước mọi xử lý Authorization**, nhằm ngăn chặn việc sử dụng Token quá hạn hoặc không hợp lệ về mặt thời gian.

**4\. Mục tiêu nghiệp vụ**

*   Ngăn chặn sử dụng Token đã hết hạn
*   Giảm thiểu rủi ro bị lạm dụng Token bị lộ
*   Chuẩn hoá kiểm soát vòng đời Token
*   Hỗ trợ kiến trúc **Short‑lived Access Token / Zero‑Trust**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

API Gateway / PEP

Gọi Expiration Check

**2**

Token Validation Service

Thực hiện kiểm tra

**3**

Authorization Engine

Chỉ xử lý Token còn hiệu lực

**4**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Token đã **pass Signature Validation (TOK‑03)**
*   Token có các claim thời gian chuẩn (exp, iat, nbf nếu có)
*   Hệ thống có đồng hồ thời gian tin cậy (NTP‑synced)

**7\. Điều kiện hậu (Post‑conditions)**

*   Token được đánh giá:
    *   **Valid (Time)** hoặc
    *   **Expired / Not Yet Valid**
*   Kết quả được gắn vào Security Context
*   Token hết hạn → **dừng xử lý request**
*   Không thay đổi trạng thái Token hay Session

**8\. Phạm vi chức năng**

**8.1. Kiểm tra Expiry (exp)**

*   Token **bắt buộc phải có exp**
*   current\_time > exp → Token **Expired**

**8.2. Kiểm tra Not Before (nbf) – nếu có**

*   current\_time < nbf → Token **Not Yet Valid**
*   Nếu không có nbf → bỏ qua kiểm tra này

**8.3. Kiểm tra Issued At (iat)**

*   iat không được:
    *   Ở tương lai vượt quá ngưỡng cho phép (clock skew)
*   Dùng để phát hiện Token bất thường

**8.4. Xử lý Clock Skew**

*   Cho phép sai lệch thời gian nhỏ (ví dụ ±60s)
*   Skew vượt ngưỡng → Token Invalid

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Token

Chuỗi Token

**2**

Issued At (iat)

Thời điểm phát hành

**3**

Not Before (nbf)

Thời điểm hiệu lực

**4**

Expiry (exp)

Thời điểm hết hạn

**5**

Current Time

Thời gian hệ thống

**6**

Validation Result

Valid / Expired / Not Yet Valid

**7**

Validation Time

Thời điểm kiểm tra

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑TOK‑04‑01

Token **bắt buộc có exp**

**2**

BR‑TOK‑04‑02

Token hết hạn → **DENY**

**3**

BR‑TOK‑04‑03

Token chưa hiệu lực → **DENY**

**4**

BR‑TOK‑04‑04

Vượt clock skew → **DENY**

**5**

BR‑TOK‑04‑05

Expiration Check **độc lập với Authorization**

**6**

BR‑TOK‑04‑06

Lỗi kiểm tra → **fail‑secure (DENY)**

**7**

BR‑TOK‑04‑07

Không override kết quả Expiration Check

**8**

BR‑TOK‑04‑08

Có thể ghi Audit Log

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  API Gateway / PEP nhận Token
2.  Token đã pass **TOK‑03 – Signature Validation**
3.  Gọi **TOK‑04 – Expiration Check**
4.  Đọc các claim thời gian (iat, nbf, exp)
5.  So sánh với thời gian hiện tại
6.  Nếu hợp lệ → tiếp tục Claim Validation / AUTHZ
7.  Nếu không hợp lệ → **Reject request**

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Thiếu exp

Invalid

**2**

Token hết hạn

Expired

**3**

Token chưa tới nbf

Invalid

**4**

Clock skew quá lớn

Invalid

**5**

Lỗi hệ thống

Invalid (fail‑secure)

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Short‑lived token

**2**

Reliability

Đồng bộ thời gian

**3**

Performance

Kiểm tra nhanh

**4**

Audit

Truy vết Token hết hạn

**14\. Ngoài phạm vi (Out of Scope)**

*   Signature Validation (TOK‑03)
*   Claim Validation khác (iss, aud, …)
*   Token Revocation
*   Authorization (RBAC / ABAC)
*   Enforcement logic

**15\. Ghi chú**

*   **Expiration Check là hàng rào sống còn của Token Security**
*   Token càng ngắn hạn → hệ thống càng an toàn
*   Bỏ qua bước này → **Token bị lộ có thể dùng vô hạn**

### TOK‑05 – Token Validation – Claim Validation

_(Kiểm tra Nội dung Claim của Token)_

**1\. Mã chức năng**

**TOK‑05**

**2\. Tên chức năng**

**Token Validation – Claim Validation**

**3\. Mô tả tổng quát**

Chức năng **Claim Validation** chịu trách nhiệm **kiểm tra tính hợp lệ, đầy đủ và nhất quán của các claim bên trong Token**, sau khi Token đã:

*   Pass **Signature Validation (TOK‑03)**
*   Pass **Expiration Check (TOK‑04)**

Claim Validation đảm bảo rằng Token:

*   Được phát hành **đúng Issuer**
*   Dành cho **đúng Audience**
*   Gắn với **đúng Subject, Tenant, Client**
*   Phù hợp với **ngữ cảnh sử dụng hiện tại**

TOK‑05 **không ra quyết định ALLOW / DENY truy cập tài nguyên**, mà chỉ xác nhận **Token có hợp lệ về mặt ngữ nghĩa hay không**.

**4\. Mục tiêu nghiệp vụ**

*   Ngăn chặn Token dùng sai mục đích (wrong audience, wrong tenant)
*   Chuẩn hoá cách kiểm tra claim trên toàn hệ thống
*   Đảm bảo Authorization Engine nhận **Security Context đáng tin cậy**
*   Đáp ứng yêu cầu **Zero‑Trust & Compliance**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

API Gateway / PEP

Gọi Claim Validation

**2**

Token Validation Service

Thực hiện kiểm tra

**3**

Authorization Engine

Tiêu thụ Security Context hợp lệ

**4**

Identity Provider (IdP)

Định nghĩa chuẩn claim

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Token đã pass **TOK‑03 – Signature Validation**
*   Token đã pass **TOK‑04 – Expiration Check**
*   Claim schema được cấu hình sẵn
*   Tenant Isolation policy đã được cấu hình

**7\. Điều kiện hậu (Post‑conditions)**

*   Token được đánh giá:
    *   **Valid (Claims)** hoặc
    *   **Invalid (Claims)**
*   Security Context được tạo từ claim hợp lệ
*   Token Invalid → **dừng xử lý request**
*   Không thay đổi trạng thái Token hay Session

**8\. Phạm vi chức năng**

**8.1. Kiểm tra Issuer (iss)**

*   iss **bắt buộc tồn tại**
*   iss phải thuộc **allow‑list** của hệ thống
*   iss không khớp → Token Invalid

**8.2. Kiểm tra Audience (aud)**

*   aud **bắt buộc tồn tại**
*   Phải khớp với:
    *   API
    *   Gateway
    *   Service đang xử lý request
*   Không khớp → Token Invalid

**8.3. Kiểm tra Subject (sub)**

*   sub **bắt buộc tồn tại**
*   Định danh hợp lệ (User ID / Client ID)
*   Không kiểm tra quyền tại bước này

**8.4. Kiểm tra Tenant Claim**

*   Token **bắt buộc có tenant\_id**
*   tenant\_id phải:
    *   Hợp lệ
    *   Phù hợp với Tenant Context của request
*   Cross‑Tenant → Token Invalid

**8.5. Kiểm tra Client / Grant Context (nếu có)**

*   client\_id (nếu có) phải hợp lệ
*   Grant type phù hợp với loại Token

**8.6. Kiểm tra Claim tuỳ chọn**

*   Authentication Level (acr, amr)
*   Scope (nếu dùng)
*   Custom claim (theo allow‑list)

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Issuer (iss)

Đơn vị phát hành

**2**

Audience (aud)

Đối tượng sử dụng

**3**

Subject (sub)

User / Client

**4**

Tenant ID

Tenant

**5**

Client ID

Ứng dụng

**6**

Scope

(nếu có)

**7**

Validation Result

Valid / Invalid

**8**

Validation Time

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑TOK‑05‑01

Token **bắt buộc có iss, aud, sub**

**2**

BR‑TOK‑05‑02

iss không hợp lệ → **DENY**

**3**

BR‑TOK‑05‑03

aud không khớp → **DENY**

**4**

BR‑TOK‑05‑04

Thiếu / sai tenant\_id → **DENY**

**5**

BR‑TOK‑05‑05

Claim ngoài allow‑list → **bỏ qua hoặc từ chối**

**6**

BR‑TOK‑05‑06

Claim Validation **độc lập với AUTHZ**

**7**

BR‑TOK‑05‑07

Lỗi kiểm tra → **fail‑secure (DENY)**

**8**

BR‑TOK‑05‑08

Có thể ghi Audit Log

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Token đã pass TOK‑03 & TOK‑04
2.  API Gateway / PEP gọi **TOK‑05 – Claim Validation**
3.  Đọc các claim chuẩn (iss, aud, sub, tenant\_id)
4.  Đối chiếu với cấu hình hệ thống & request context
5.  Nếu hợp lệ → tạo Security Context
6.  Chuyển Security Context cho Authorization Engine
7.  Nếu không hợp lệ → **Reject request**

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Thiếu claim bắt buộc

Invalid

**2**

Audience không khớp

Invalid

**3**

Issuer không tin cậy

Invalid

**4**

Cross‑Tenant

Invalid

**5**

Lỗi hệ thống

Invalid (fail‑secure)

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Strict claim checking

**2**

Consistency

Schema thống nhất

**3**

Performance

Kiểm tra nhanh

**4**

Audit

Truy vết claim vi phạm

**14\. Ngoài phạm vi (Out of Scope)**

*   Signature Validation (TOK‑03)
*   Expiration Check (TOK‑04)
*   Token Revocation
*   Authorization (RBAC / ABAC)
*   Enforcement logic

**15\. Ghi chú**

*   **Claim Validation đảm bảo Token “đúng ngữ cảnh”**
*   Token hợp lệ về chữ ký nhưng sai claim → **vẫn phải DENY**
*   Đây là bước **cuối cùng của Token Validation Pipeline**

### TOK‑06 – Token Revocation – Logout Revoke

_(Thu hồi Token khi Người dùng Logout)_

**1\. Mã chức năng**

**TOK‑06**

**2\. Tên chức năng**

**Token Revocation – Logout Revoke**

**3\. Mô tả tổng quát**

Chức năng **Logout Revoke** chịu trách nhiệm **thu hồi (revoke) Token khi người dùng hoặc client thực hiện Logout**, nhằm đảm bảo rằng:

*   Token **không thể tiếp tục được sử dụng** sau khi Logout
*   Phiên truy cập được **kết thúc một cách chủ động**
*   Rủi ro lạm dụng Token bị lộ được giảm thiểu

TOK‑06 áp dụng cho:

*   Refresh Token (bắt buộc)
*   Access Token (tuỳ kiến trúc: blacklist / introspection)

TOK‑06 là **cơ chế revocation chủ động**, khác với việc Token tự hết hạn.

**4\. Mục tiêu nghiệp vụ**

*   Đảm bảo Logout thực sự chấm dứt phiên truy cập
*   Ngăn chặn reuse Token sau Logout
*   Chuẩn hoá hành vi Logout trong hệ thống Zero‑Trust
*   Đáp ứng yêu cầu bảo mật & compliance (ISO, SOC2)

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

User / Client

Kích hoạt Logout

**2**

Authentication Service

Nhận yêu cầu Logout

**3**

Token Service

Thực hiện Revocation

**4**

API Gateway / PEP

Thực thi quyết định revocation

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   User / Client đang có phiên hợp lệ
*   Token hợp lệ tại thời điểm Logout
*   Logout request được xác thực
*   Tenant Context hợp lệ

**7\. Điều kiện hậu (Post‑conditions)**

*   Refresh Token bị **Revoke**
*   Access Token:
    *   Bị revoke ngay (nếu dùng blacklist / introspection), hoặc
    *   Không thể gia hạn (nếu short‑lived)
*   Phiên đăng nhập bị chấm dứt
*   (Tuỳ cấu hình) Ghi Audit Log

**8\. Phạm vi chức năng**

**8.1. Xác định phạm vi Logout**

Logout có thể áp dụng:

*   Single session
*   All sessions của User
*   Theo Client / Device cụ thể

**8.2. Thu hồi Refresh Token**

*   Refresh Token:
    *   Được đánh dấu **Revoked**
    *   Không thể dùng để xin Access Token mới
*   Bắt buộc cho mọi Logout

**8.3. Xử lý Access Token**

*   Tuỳ kiến trúc:
    *   **Short‑lived Access Token**: không cần revoke ngay
    *   **Stateful / Introspection**: đưa vào blacklist
*   Không thay đổi nội dung Token đã phát hành

**8.4. Dọn dẹp Session & Context**

*   Huỷ Session server‑side (nếu có)
*   Xoá binding Device / Session
*   Đồng bộ trạng thái Logout

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Logout Request ID

Định danh

**2**

Subject (sub)

User / Client

**3**

Tenant ID

Tenant

**4**

Refresh Token ID

Token bị revoke

**5**

Access Token ID (jti)

(nếu có)

**6**

Revocation Scope

Session / User / Client

**7**

Revocation Reason

Logout

**8**

Revocation Time

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑TOK‑06‑01

Logout → **bắt buộc revoke Refresh Token**

**2**

BR‑TOK‑06‑02

Refresh Token revoke → không thể gia hạn

**3**

BR‑TOK‑06‑03

Access Token có thể còn hiệu lực ngắn hạn

**4**

BR‑TOK‑06‑04

Revoke áp dụng đúng Tenant

**5**

BR‑TOK‑06‑05

Cross‑Tenant Logout → từ chối

**6**

BR‑TOK‑06‑06

Lỗi revoke → **fail‑secure**

**7**

BR‑TOK‑06‑07

Revoked Token không thể phục hồi

**8**

BR‑TOK‑06‑08

Có thể ghi Audit Log

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  User / Client gửi yêu cầu Logout
2.  Authentication Service xác thực Logout request
3.  Gọi **TOK‑06 – Logout Revoke**
4.  Xác định phạm vi revoke
5.  Revoke Refresh Token
6.  (Tuỳ chọn) Blacklist Access Token
7.  Huỷ session / binding
8.  Trả kết quả Logout thành công

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Token không tồn tại

Logout idempotent

**2**

Token đã revoke

Thành công

**3**

Tenant không hợp lệ

Từ chối

**4**

Lỗi hệ thống

Logout thất bại

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Revoke tức thì Refresh Token

**2**

Reliability

Logout idempotent

**3**

Performance

Revoke nhanh

**4**

Audit

Truy vết Logout

**14\. Ngoài phạm vi (Out of Scope)**

*   Token Expiration tự nhiên
*   Token Rotation
*   Authorization (RBAC / ABAC)
*   UI Logout chi tiết

**15\. Ghi chú**

*   **Logout không chỉ là xoá cookie**
*   Không revoke Refresh Token → Logout **không an toàn**
*   TOK‑06 là nền tảng cho **Session Security**

### TOK‑07 – Token Revocation – Incident Revoke

_(Thu hồi Token Khẩn cấp do Sự cố An ninh)_

**1\. Mã chức năng**

**TOK‑07**

**2\. Tên chức năng**

**Token Revocation – Incident Revoke**

**3\. Mô tả tổng quát**

Chức năng **Incident Revoke** cho phép hệ thống **thu hồi Token một cách cưỡng bức và tức thời** khi xảy ra hoặc nghi ngờ xảy ra **sự cố an ninh**, nhằm **cắt đứt ngay mọi truy cập** liên quan đến Token / Subject / Client / Tenant bị ảnh hưởng.

Áp dụng cho các tình huống:

*   Lộ Token / nghi ngờ bị đánh cắp
*   Tài khoản hoặc Client bị compromise
*   Thiết bị bị mất / bị chiếm quyền
*   Phát hiện gian lận, hành vi bất thường
*   Vi phạm chính sách bảo mật nghiêm trọng

TOK‑07 là **kill‑switch bảo mật**, ưu tiên cao nhất trong vòng đời Token.

**4\. Mục tiêu nghiệp vụ**

*   Phản ứng **tức thời** với sự cố an ninh
*   Giảm **blast radius** khi Token bị compromise
*   Trao quyền chủ động cho SOC / Security Admin
*   Đáp ứng yêu cầu **Incident Response, ISO 27001, SOC2**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Security Admin / SOC

Kích hoạt Incident Revoke

**2**

Automated Detection System

Phát hiện & kích hoạt

**3**

Token Service

Thực hiện Revocation

**4**

API Gateway / PEP

Thực thi trạng thái revoke

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Sự cố an ninh được phát hiện hoặc khai báo
*   Định danh được mục tiêu revoke (Token/User/Client/Tenant)
*   Quyền Incident Response hợp lệ
*   Tenant Context hợp lệ

**7\. Điều kiện hậu (Post‑conditions)**

*   Token mục tiêu bị **Revoke ngay lập tức**
*   Refresh Token liên quan **bị vô hiệu hoá hoàn toàn**
*   Access Token liên quan **bị từ chối tức thì**
*   Mọi request dùng Token bị revoke → **DENY**
*   Ghi đầy đủ Audit & Security Log

**8\. Phạm vi chức năng**

**8.1. Phạm vi Revocation**

Có thể áp dụng cho:

*   Một Token cụ thể (jti)
*   Toàn bộ Token của:
    *   User
    *   Client
    *   Device
*   Toàn bộ Token trong:
    *   Tenant
    *   Audience / Scope cụ thể

**8.2. Thu hồi Refresh Token (bắt buộc)**

*   Revoke **toàn bộ Refresh Token liên quan**
*   Ngăn chặn mọi khả năng gia hạn Access Token

**8.3. Thu hồi Access Token (cưỡng bức)**

*   Thực hiện qua:
    *   Blacklist tức thời, hoặc
    *   Introspection‑based deny
*   Không chờ Token hết hạn tự nhiên

**8.4. Kiểm soát Blast Radius**

*   Cho phép:
    *   Revoke chọn lọc (minimize impact)
    *   Revoke mở rộng (contain incident)
*   Mọi revoke phải có **Reason Code**

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Incident ID

Định danh sự cố

**2**

Revocation Target

Token / User / Client / Tenant

**3**

Token ID (jti)

(nếu áp dụng)

**4**

Subject (sub)

User / Client

**5**

Tenant ID

Tenant

**6**

Revocation Reason

Loại sự cố

**7**

Initiator

Admin / System

**8**

Revocation Time

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑TOK‑07‑01

Incident Revoke có **ưu tiên cao nhất**

**2**

BR‑TOK‑07‑02

Bắt buộc revoke **Refresh Token trước**

**3**

BR‑TOK‑07‑03

Access Token bị revoke **ngay lập tức**

**4**

BR‑TOK‑07‑04

Không cho phép override

**5**

BR‑TOK‑07‑05

Revoke đúng Tenant Boundary

**6**

BR‑TOK‑07‑06

Lỗi xử lý → **fail‑secure (DENY)**

**7**

BR‑TOK‑07‑07

Mọi Incident Revoke **bắt buộc audit**

**8**

BR‑TOK‑07‑08

Revocation **không thể rollback**

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Phát hiện / khai báo Security Incident
2.  Gửi yêu cầu **TOK‑07 – Incident Revoke**
3.  Xác thực quyền & phạm vi revoke
4.  Xác định blast radius
5.  Revoke Refresh Token liên quan
6.  Revoke / Blacklist Access Token
7.  Cập nhật trạng thái bảo mật
8.  Ghi Audit & Security Log
9.  Thông báo (nếu cấu hình)

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Token không tồn tại

Idempotent, ghi log

**2**

Token đã revoke

Thành công

**3**

Tenant không hợp lệ

Từ chối

**4**

Lỗi hệ thống

Fail‑secure

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Immediate enforcement

**2**

Reliability

Idempotent

**3**

Performance

Revoke tức thời

**4**

Audit

Full forensic trace

**14\. Ngoài phạm vi (Out of Scope)**

*   Phân tích nguyên nhân sự cố
*   Khôi phục sau Incident
*   Token Issuance
*   Authorization (RBAC / ABAC)
*   UI quản lý Incident

**15\. Ghi chú**

*   **TOK‑07 là “emergency brake” của IAM**
*   Thiết kế phải **nhanh – chính xác – không nhân nhượng**
*   Chậm revoke → **sự cố lan rộng theo cấp số nhân**

### TOK‑08 – Token Revocation – Admin Force Revoke

_(Thu hồi Token Cưỡng bức theo Quyết định Quản trị)_

**1\. Mã chức năng**

**TOK‑08**

**2\. Tên chức năng**

**Token Revocation – Admin Force Revoke**

**3\. Mô tả tổng quát**

Chức năng **Admin Force Revoke** cho phép **Quản trị viên (Admin)** hoặc **Hệ thống quản trị IAM** **thu hồi Token một cách chủ động và có chủ đích**, **không cần có Security Incident**, nhằm phục vụ các tình huống vận hành và quản trị như:

*   Khoá tài khoản người dùng
*   Thu hồi quyền truy cập khi thay đổi vai trò / hợp đồng
*   Reset phiên truy cập theo yêu cầu quản trị
*   Cưỡng bức logout trên diện rộng
*   Dọn dẹp Token cũ hoặc không tuân thủ chính sách

TOK‑08 là **cơ chế quản trị có kiểm soát**, khác với:

*   **TOK‑06**: Logout tự nguyện
*   **TOK‑07**: Incident khẩn cấp

**4\. Mục tiêu nghiệp vụ**

*   Cho phép Admin kiểm soát vòng đời Token theo chính sách
*   Đảm bảo thay đổi quản trị **có hiệu lực ngay**
*   Hỗ trợ vận hành hệ thống đa Tenant
*   Đáp ứng yêu cầu **Governance, Audit, Compliance**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

System Admin / Tenant Admin

Kích hoạt Force Revoke

**2**

IAM Admin Console

Gửi yêu cầu

**3**

Token Service

Thực hiện Revocation

**4**

API Gateway / PEP

Thực thi trạng thái revoke

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Admin đã được xác thực & phân quyền hợp lệ
*   Xác định rõ **phạm vi revoke**
*   Tenant Context hợp lệ
*   Tuân thủ **Admin Boundary & Tenant Isolation**

**7\. Điều kiện hậu (Post‑conditions)**

*   Token trong phạm vi chỉ định bị **Revoke**
*   Refresh Token liên quan **bị vô hiệu hoá**
*   Access Token liên quan **bị từ chối**
*   Người dùng / client bị **cưỡng bức logout**
*   Ghi đầy đủ Audit Log

**8\. Phạm vi chức năng**

**8.1. Phạm vi Force Revoke**

Admin có thể revoke:

*   Một Token cụ thể (jti)
*   Toàn bộ Token của:
    *   User
    *   Client
    *   Device
*   Tất cả Token của:
    *   Tenant
    *   Nhóm người dùng
    *   Audience / Scope cụ thể

**8.2. Thu hồi Refresh Token (bắt buộc)**

*   Mọi Refresh Token trong phạm vi revoke **phải bị revoke**
*   Ngăn chặn hoàn toàn khả năng gia hạn Access Token

**8.3. Thu hồi Access Token**

*   Thực hiện thông qua:
    *   Blacklist tức thời, hoặc
    *   Introspection‑based deny
*   Không thay đổi nội dung Token đã phát hành

**8.4. Đồng bộ trạng thái quản trị**

*   Có thể đồng bộ với:
    *   Account Status (Locked / Disabled)
    *   Role / Policy change
*   Revoke có hiệu lực **ngay lập tức**

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Force Revoke ID

Định danh

**2**

Revocation Target

Token / User / Client / Tenant

**3**

Token ID (jti)

(nếu có)

**4**

Subject (sub)

User / Client

**5**

Tenant ID

Tenant

**6**

Initiator

Admin

**7**

Revoke Reason

Admin Action

**8**

Revocation Time

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑TOK‑08‑01

Chỉ Admin hợp lệ mới được Force Revoke

**2**

BR‑TOK‑08‑02

Force Revoke **bắt buộc ghi reason**

**3**

BR‑TOK‑08‑03

Refresh Token phải bị revoke trước

**4**

BR‑TOK‑08‑04

Access Token bị từ chối ngay

**5**

BR‑TOK‑08‑05

Không vượt Tenant Boundary

**6**

BR‑TOK‑08‑06

Lỗi xử lý → **fail‑secure (DENY)**

**7**

BR‑TOK‑08‑07

Force Revoke không thể rollback

**8**

BR‑TOK‑08‑08

Mọi Force Revoke **bắt buộc audit**

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Admin đăng nhập IAM Admin Console
2.  Chọn đối tượng cần Force Revoke
3.  Nhập lý do revoke
4.  Gửi yêu cầu **TOK‑08 – Admin Force Revoke**
5.  Xác thực quyền & phạm vi
6.  Revoke Refresh Token liên quan
7.  Revoke / Blacklist Access Token
8.  Đồng bộ trạng thái quản trị
9.  Ghi Audit Log
10.  Thông báo (nếu cấu hình)

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Admin không đủ quyền

Từ chối

**2**

Token không tồn tại

Idempotent

**3**

Tenant không hợp lệ

Từ chối

**4**

Lỗi hệ thống

Fail‑secure

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Strong admin auth

**2**

Governance

Reason & approval

**3**

Reliability

Idempotent

**4**

Audit

Full traceability

**14\. Ngoài phạm vi (Out of Scope)**

*   Token Issuance
*   Token Validation
*   Incident Detection
*   Authorization (RBAC / ABAC)
*   UI chi tiết Admin Console

**15\. Ghi chú**

*   **Admin Force Revoke = quyền lực cao → kiểm soát chặt**
*   Bắt buộc **audit + reason + tenant boundary**
*   Lạm dụng Force Revoke → rủi ro vận hành

### TOK‑09 – Token Revocation – Token Blacklist

_(Cơ chế Danh sách Đen Token)_

**1\. Mã chức năng**

**TOK‑09**

**2\. Tên chức năng**

**Token Revocation – Token Blacklist**

**3\. Mô tả tổng quát**

Chức năng **Token Blacklist** cung cấp cơ chế **vô hiệu hoá Access Token đã phát hành trước thời điểm hết hạn**, bằng cách **đưa Token vào danh sách đen (blacklist)** và **từ chối mọi request sử dụng Token đó**.

TOK‑09 là **lớp thực thi revocation đối với Access Token** trong các kiến trúc:

*   Access Token có thời hạn dài
*   Cần revoke tức thì
*   Không sử dụng introspection real‑time cho mọi request

Blacklist **không thay đổi Token**, mà **phủ quyết hiệu lực Token tại thời điểm sử dụng**.

**4\. Mục tiêu nghiệp vụ**

*   Vô hiệu hoá Access Token tức thì khi cần
*   Hỗ trợ các luồng revoke (TOK‑06 / 07 / 08)
*   Đảm bảo enforcement nhất quán tại Gateway / PEP
*   Cân bằng giữa **security** và **performance**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Token Service

Ghi Token vào Blacklist

**2**

API Gateway / PEP

Kiểm tra Blacklist

**3**

Revocation Engine

Điều phối revoke

**4**

Cache / Storage Service

Lưu Blacklist

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Access Token hợp lệ về mặt chữ ký & định dạng
*   Có yêu cầu revoke từ:
    *   Logout (TOK‑06)
    *   Incident (TOK‑07)
    *   Admin Force Revoke (TOK‑08)
*   Token có định danh (jti) hoặc fingerprint

**7\. Điều kiện hậu (Post‑conditions)**

*   Token bị thêm vào Blacklist
*   Mọi request sử dụng Token đó → **DENY**
*   Blacklist entry tồn tại đến:
    *   Khi Token hết hạn, hoặc
    *   Khi bị dọn dẹp theo policy
*   Ghi Audit Log (nếu cấu hình)

**8\. Phạm vi chức năng**

**8.1. Định danh Token để Blacklist**

Blacklist dựa trên:

*   jti (khuyến nghị)
*   Hash của Token
*   Combination:
    *   iss + sub + iat (fallback)

**8.2. Ghi Token vào Blacklist**

*   Blacklist Entry bao gồm:
    *   Token Identifier
    *   Tenant ID
    *   Revocation Reason
    *   Revocation Time
    *   Expiry Time (theo exp của Token)

**8.3. Kiểm tra Blacklist khi xử lý request**

*   API Gateway / PEP:
    *   Kiểm tra Blacklist **sau Claim Validation**
    *   Trước Authorization
*   Token nằm trong Blacklist → **Reject ngay**

**8.4. Lưu trữ & Cache Blacklist**

*   Lưu trữ:
    *   In‑memory cache (Redis, Hazelcast, …)
    *   Persistent store (tuỳ chọn)
*   Hỗ trợ:
    *   TTL theo exp
    *   Eviction tự động

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Blacklist Entry ID

Định danh

**2**

Token ID (jti)

Định danh Token

**3**

Token Hash

(nếu dùng)

**4**

Tenant ID

Tenant

**5**

Revocation Reason

Logout / Incident / Admin

**6**

Source

TOK‑06 / 07 / 08

**7**

Revocation Time

Thời điểm

**8**

Expiry Time

Theo exp

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑TOK‑09‑01

Chỉ Access Token mới dùng Blacklist

**2**

BR‑TOK‑09‑02

Token trong Blacklist → **DENY tuyệt đối**

**3**

BR‑TOK‑09‑03

Blacklist gắn Tenant ID

**4**

BR‑TOK‑09‑04

Blacklist entry có TTL

**5**

BR‑TOK‑09‑05

Không xoá blacklist trước khi Token hết hạn

**6**

BR‑TOK‑09‑06

Lỗi kiểm tra → **fail‑secure (DENY)**

**7**

BR‑TOK‑09‑07

Blacklist check độc lập với AUTHZ

**8**

BR‑TOK‑09‑08

Có thể ghi Audit Log

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Có yêu cầu revoke Access Token
2.  Token Service tạo Blacklist Entry
3.  Lưu Blacklist Entry vào cache / store
4.  API Gateway / PEP nhận request
5.  Token pass Validation (TOK‑03 → 05)
6.  Kiểm tra **TOK‑09 – Token Blacklist**
7.  Nếu có trong Blacklist → **Reject request**
8.  Nếu không → tiếp tục Authorization

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Token không có jti

Dùng hash / fingerprint

**2**

Blacklist store tạm lỗi

DENY (fail‑secure)

**3**

Entry đã hết TTL

Bỏ qua

**4**

Token đã hết hạn

Không cần blacklist

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Performance

Blacklist lookup < ms

**2**

Scalability

Phân tán, cache‑friendly

**3**

Security

Tenant‑isolated

**4**

Reliability

Fail‑secure

**5**

Audit

Truy vết revoke

**14\. Ngoài phạm vi (Out of Scope)**

*   Refresh Token Revocation
*   Token Issuance
*   Token Rotation
*   Authorization (RBAC / ABAC)
*   UI quản lý Blacklist

**15\. Ghi chú**

*   **Blacklist là “cưỡng bức revoke” cho Access Token**
*   Chỉ nên dùng khi:
    *   Token không quá ngắn hạn
    *   Cần revoke tức thì
*   Lạm dụng blacklist → ảnh hưởng performance

### SES‑01 – Session Lifecycle – Session Creation

_(Khởi tạo Phiên làm việc – Session Initialization)_

**1\. Mã chức năng**

**SES‑01**

**2\. Tên chức năng**

**Session Lifecycle – Session Creation**

**3\. Mô tả tổng quát**

Chức năng **Session Creation** chịu trách nhiệm **khởi tạo phiên làm việc (Session)** cho User hoặc Client **sau khi xác thực thành công**, nhằm:

*   Duy trì **trạng thái đăng nhập liên tục**
*   Liên kết User / Client với ngữ cảnh truy cập
*   Hỗ trợ trải nghiệm người dùng (SSO, UI session)
*   Phục vụ các luồng **stateful interaction**

SES‑01 **không phát hành Token**, **không thay thế Token**, và **không quyết định quyền truy cập**.

**4\. Mục tiêu nghiệp vụ**

*   Tạo Session an toàn, định danh duy nhất
*   Duy trì trạng thái đăng nhập hợp lệ
*   Hỗ trợ Web / App / SSO use‑cases
*   Tách bạch rõ **Session vs Token**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

User / Client

Khởi tạo đăng nhập

**2**

Authentication Service

Xác thực danh tính

**3**

Session Service

Tạo & quản lý Session

**4**

API Gateway / UI Gateway

Gắn Session

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   User / Client **đã xác thực thành công**
*   Xác thực MFA (nếu yêu cầu) đã hoàn tất
*   Tenant Context hợp lệ
*   Chính sách Session được cấu hình

**7\. Điều kiện hậu (Post‑conditions)**

*   Session được tạo với **Session ID duy nhất**
*   Session được gắn với:
    *   User / Client
    *   Tenant
    *   Device / Browser (nếu có)
*   Session được lưu trữ server‑side
*   Session ID được trả về client (cookie / header)

**8\. Phạm vi chức năng**

**8.1. Khởi tạo Session**

*   Tạo **Session ID ngẫu nhiên, khó đoán**
*   Không chứa thông tin nhạy cảm
*   Không encode quyền truy cập

**8.2. Gắn ngữ cảnh Session**

Session bao gồm:

*   session\_id
*   subject\_id (sub)
*   tenant\_id
*   auth\_time
*   auth\_level (acr)
*   client\_id (nếu có)
*   device\_id / fingerprint (tuỳ chọn)

**8.3. Thiết lập thời gian sống**

*   Session Timeout:
    *   Idle timeout
    *   Absolute timeout
*   Chính sách khác với Token Expiry

**8.4. Trả Session cho Client**

*   Web:
    *   Secure, HttpOnly Cookie
*   API / App:
    *   Session Header (nếu áp dụng)
*   Không trả Session nội dung chi tiết

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Session ID

Định danh phiên

**2**

Subject (sub)

User / Client

**3**

Tenant ID

Tenant

**4**

Authentication Time

Thời điểm xác thực

**5**

Session Status

Active

**6**

Client / Device Info

(nếu có)

**7**

Creation Time

Thời điểm tạo

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑SES‑01‑01

Chỉ tạo Session sau khi Auth thành công

**2**

BR‑SES‑01‑02

Session ID **không đoán được**

**3**

BR‑SES‑01‑03

Session **bắt buộc gắn Tenant**

**4**

BR‑SES‑01‑04

Session ≠ Token

**5**

BR‑SES‑01‑05

Không lưu quyền trong Session

**6**

BR‑SES‑01‑06

Lỗi tạo Session → **fail‑secure**

**7**

BR‑SES‑01‑07

Có thể ghi Audit Log

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  User hoàn tất Authentication
2.  Authentication Service xác nhận thành công
3.  Gọi **SES‑01 – Session Creation**
4.  Session Service tạo Session ID
5.  Gắn ngữ cảnh Session
6.  Lưu Session server‑side
7.  Trả Session ID cho Client
8.  Kết thúc Login Flow

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Auth chưa hoàn tất

Không tạo Session

**2**

Tenant không hợp lệ

Từ chối

**3**

Lỗi lưu Session

Login thất bại

**4**

Trùng Session ID

Tạo lại

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Secure, HttpOnly cookie

**2**

Reliability

Session creation atomic

**3**

Performance

Tạo nhanh

**4**

Scalability

Stateless frontend

**5**

Audit

Truy vết login

**14\. Ngoài phạm vi (Out of Scope)**

*   Token Issuance (TOK‑01 / 02)
*   Token Validation
*   Authorization (RBAC / ABAC)
*   Session Validation / Renewal / Termination

**15\. Ghi chú**

*   **Session là trạng thái – Token là chứng chỉ**
*   Không thay thế Token bằng Session
*   Không nhét quyền vào Session

### SES‑02 – Session Lifecycle – Session Expiration

_(Hết hạn Phiên làm việc – Session Timeout Control)_

**1\. Mã chức năng**

**SES‑02**

**2\. Tên chức năng**

**Session Lifecycle – Session Expiration**

**3\. Mô tả tổng quát**

Chức năng **Session Expiration** chịu trách nhiệm **xác định và thực thi việc hết hạn của Session** dựa trên **chính sách thời gian sống (timeout policy)**, nhằm đảm bảo rằng:

*   Session **không tồn tại vô thời hạn**
*   Phiên đăng nhập **tự động mất hiệu lực** khi vượt quá giới hạn cho phép
*   Giảm rủi ro **Session Hijacking / Forgotten Session**

SES‑02 là **cơ chế thụ động theo thời gian**, **không cần hành động chủ động từ User hoặc Admin**, và **khác hoàn toàn với Session Termination (SES‑04)**.

**4\. Mục tiêu nghiệp vụ**

*   Kiểm soát vòng đời Session theo chính sách bảo mật
*   Tự động kết thúc phiên không còn hợp lệ
*   Chuẩn hoá hành vi timeout trên toàn hệ thống
*   Đáp ứng yêu cầu **Security Baseline / Compliance (ISO, SOC2)**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Session Service

Đánh giá & áp dụng Expiration

**2**

API Gateway / UI Gateway

Kiểm tra Session khi có request

**3**

Client / Browser

Nhận trạng thái Session

**4**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Session đã được tạo hợp lệ (SES‑01)
*   Session Policy đã được cấu hình
*   Hệ thống có thời gian đồng bộ (NTP)

**7\. Điều kiện hậu (Post‑conditions)**

*   Session được xác định ở trạng thái:
    *   **Active**, hoặc
    *   **Expired**
*   Session Expired → **không được chấp nhận cho request mới**
*   Không tự động revoke Token (trừ khi cấu hình riêng)
*   Có thể ghi Audit Log

**8\. Phạm vi chức năng**

**8.1. Idle Timeout (Bắt buộc)**

*   Nếu Session **không có hoạt động** trong khoảng thời gian cấu hình:
    *   Session → **Expired**
*   Hoạt động hợp lệ bao gồm:
    *   UI interaction
    *   Session keep‑alive (nếu có)

**8.2. Absolute Timeout (Bắt buộc)**

*   Session **không được tồn tại vượt quá thời gian tối đa**
*   Áp dụng **kể cả khi Session vẫn hoạt động liên tục**

**8.3. Sliding Expiration (Tuỳ chọn)**

*   Mỗi hoạt động hợp lệ:
    *   Gia hạn **Idle Timeout**
*   **Không bao giờ vượt Absolute Timeout**

**8.4. Chính sách Expiration đa cấp**

Session timeout có thể khác nhau theo:

*   Tenant
*   User type
*   Client / Application
*   Risk / Authentication Level (acr)

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Session ID

Định danh Session

**2**

Creation Time

Thời điểm tạo

**3**

Last Activity Time

Hoạt động gần nhất

**4**

Idle Timeout

Ngưỡng không hoạt động

**5**

Absolute Timeout

Tuổi thọ tối đa

**6**

Expiration Time

Thời điểm hết hạn

**7**

Session Status

Active / Expired

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑SES‑02‑01

Mọi Session **bắt buộc có timeout**

**2**

BR‑SES‑02‑02

Vượt Idle Timeout → Expired

**3**

BR‑SES‑02‑03

Vượt Absolute Timeout → Expired

**4**

BR‑SES‑02‑04

Sliding không vượt Absolute

**5**

BR‑SES‑02‑05

Session Expired → **DENY**

**6**

BR‑SES‑02‑06

Expiration ≠ Termination

**7**

BR‑SES‑02‑07

Lỗi xử lý → **fail‑secure**

**8**

BR‑SES‑02‑08

Có thể ghi Audit Log

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Session đang ở trạng thái Active
2.  Gateway / Session Service nhận request
3.  Kiểm tra:
    *   Thời gian không hoạt động (Idle)
    *   Tuổi thọ tối đa (Absolute)
4.  Nếu vượt ngưỡng → đánh dấu **Expired**
5.  Từ chối request gắn Session đó
6.  Trả thông báo Session hết hạn cho Client

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Không có hoạt động lâu

Expired

**2**

Session đã Terminate

Bỏ qua

**3**

Restart node

Đánh giá lại Session

**4**

Lỗi kiểm tra

DENY

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Timeout hợp lý, cấu hình được

**2**

Reliability

Expiration chính xác

**3**

Performance

Kiểm tra nhanh

**4**

Consistency

Đồng bộ multi‑node

**5**

Audit

Truy vết timeout

**14\. Ngoài phạm vi (Out of Scope)**

*   Session Creation (SES‑01)
*   Session Renewal (SES‑03)
*   Session Termination (SES‑04)
*   Token Expiration (TOK‑04)
*   Token Revocation

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Session Expiration ≠ Token Expiration**
*   Session hết hạn **không đồng nghĩa Token bị revoke**
*   UI Session chết nhưng API Token **có thể vẫn hợp lệ**

### SES‑03 – Concurrent Session – Logout All Sessions

_(Đăng xuất đồng thời tất cả Session của một Subject)_

**1\. Mã chức năng**

**SES‑03**

**2\. Tên chức năng**

**Concurrent Session – Logout All Sessions**

**3\. Mô tả tổng quát**

Chức năng **Logout All Sessions** cho phép **chủ động chấm dứt đồng thời toàn bộ Session đang hoạt động** của một **User hoặc Client**, bất kể:

*   Thiết bị
*   Trình duyệt
*   Ứng dụng (client)
*   Địa điểm truy cập

SES‑03 được sử dụng khi cần **đảm bảo không còn phiên đăng nhập nào tồn tại**, nhưng **không mặc định là sự cố an ninh**.

**4\. Mục tiêu nghiệp vụ**

*   Cho phép User hoặc Admin **cưỡng bức đăng xuất toàn bộ**
*   Giảm rủi ro khi:
    *   Đăng nhập trên nhiều thiết bị
    *   Quên logout ở thiết bị cũ
*   Hỗ trợ use‑case:
    *   “Logout all devices”
    *   “Sign out everywhere”
*   Phù hợp yêu cầu **User Security Control & Governance**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

User

Chủ động Logout All Sessions

**2**

Admin / Support

Cưỡng bức Logout

**3**

Session Service

Thực hiện termination

**4**

API Gateway / UI Gateway

Thực thi deny

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Subject đã được xác thực
*   Xác định được **Subject ID** và **Tenant**
*   Quyền thực hiện Logout All Sessions hợp lệ
*   Session Store khả dụng

**7\. Điều kiện hậu (Post‑conditions)**

*   **Tất cả Session đang Active → Terminated**
*   Không còn Session hợp lệ cho Subject đó
*   Các request sử dụng Session cũ → **DENY**
*   Có thể kích hoạt revoke Token liên quan (tuỳ chính sách)
*   Ghi Audit Log

**8\. Phạm vi chức năng**

**8.1. Xác định phạm vi Concurrent Sessions**

Logout All Sessions áp dụng cho:

*   Tất cả Session của:
    *   User
    *   Client
*   Trong **cùng Tenant**
*   Không ảnh hưởng Cross‑Tenant

**8.2. Thực thi Termination hàng loạt**

*   Lặp qua toàn bộ Session Active
*   Đánh dấu:
    *   status = TERMINATED
    *   termination\_reason = LOGOUT\_ALL
*   Thực thi **gần như đồng thời**

**8.3. Đồng bộ với Token (Tuỳ chọn)**

Theo chính sách:

*   Có thể:
    *   Revoke Refresh Token (khuyến nghị)
    *   Không revoke Access Token (nếu short‑lived)
*   Tham chiếu:
    *   TOK‑06 (Logout Revoke)
    *   TOK‑08 (Admin Force Revoke)

**8.4. Phản hồi cho Client**

*   Session hiện tại cũng bị terminate
*   Client phải:
    *   Chuyển về màn hình login
    *   Không reuse Session cũ

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Subject ID (sub)

User / Client

**2**

Tenant ID

Tenant

**3**

Session IDs

Danh sách Session bị terminate

**4**

Initiator

User / Admin

**5**

Termination Reason

LOGOUT\_ALL

**6**

Termination Time

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑SES‑03‑01

Logout All chỉ áp dụng trong 1 Tenant

**2**

BR‑SES‑03‑02

Mọi Session Active phải bị terminate

**3**

BR‑SES‑03‑03

Không phụ thuộc Session hiện tại

**4**

BR‑SES‑03‑04

Termination có hiệu lực ngay

**5**

BR‑SES‑03‑05

Lỗi một phần → tiếp tục session khác

**6**

BR‑SES‑03‑06

Fail xử lý → **fail‑secure**

**7**

BR‑SES‑03‑07

Bắt buộc Audit

**8**

BR‑SES‑03‑08

Idempotent

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  User / Admin chọn **Logout All Sessions**
2.  Xác thực quyền & Tenant
3.  Session Service truy vấn toàn bộ Session Active của Subject
4.  Thực thi **bulk termination**
5.  (Tuỳ chọn) Kích hoạt Token Revoke
6.  Cập nhật Session Store
7.  Ghi Audit Log
8.  Trả kết quả thành công

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Không có Session Active

Thành công (idempotent)

**2**

Một Session không terminate được

Ghi log, tiếp tục

**3**

Tenant không hợp lệ

Từ chối

**4**

Lỗi hệ thống

Fail‑secure

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Immediate enforcement

**2**

Reliability

Atomic theo Session

**3**

Performance

Bulk terminate hiệu quả

**4**

Scalability

Hàng nghìn Session

**5**

Audit

Full traceability

**14\. Ngoài phạm vi (Out of Scope)**

*   Session Expiration (SES‑02)
*   Session Renewal (SES‑03 khác)
*   Token Validation
*   Authorization (RBAC / ABAC)
*   UI chi tiết quản lý Session

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Logout All Sessions ≠ Incident Revoke**
*   Đây là **user/admin‑initiated**, không phải emergency
*   Token chỉ revoke **theo chính sách**, không mặc định

### SES‑03 – Concurrent Session – Session Timeout Policy

_(Chính sách Timeout cho Đa phiên làm việc)_

**1\. Mã chức năng**

**SES‑03**

**2\. Tên chức năng**

**Concurrent Session – Session Timeout Policy**

**3\. Mô tả tổng quát**

Chức năng **Session Timeout Policy** định nghĩa và thực thi **các chính sách thời gian sống của Session trong bối cảnh một Subject có nhiều Session đồng thời (concurrent sessions)**, nhằm:

*   Kiểm soát rủi ro khi User đăng nhập trên **nhiều thiết bị / trình duyệt**
*   Đảm bảo mỗi Session tuân thủ **timeout policy nhất quán**
*   Cho phép áp dụng **chính sách khác nhau cho từng Session**, dựa trên ngữ cảnh

SES‑03 **không trực tiếp làm expire Session**, mà **cung cấp chính sách** để **SES‑02 – Session Expiration** thực thi.

**4\. Mục tiêu nghiệp vụ**

*   Kiểm soát an ninh trong mô hình đa phiên
*   Giảm nguy cơ lạm dụng Session dài hạn
*   Hỗ trợ các use‑case:
    *   Web + Mobile song song
    *   Nhiều thiết bị cá nhân / công việc
*   Phù hợp **Enterprise IAM / Zero‑Trust**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Session Policy Engine

Định nghĩa & áp dụng policy

**2**

Session Service

Gán policy cho Session

**3**

API Gateway / UI Gateway

Thực thi timeout

**4**

Security Admin

Cấu hình policy

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Session đã được tạo (SES‑01)
*   Subject có thể có **nhiều Session Active**
*   Session Policy đã được cấu hình theo Tenant
*   Session có metadata ngữ cảnh (device, client, risk…)

**7\. Điều kiện hậu (Post‑conditions)**

*   Mỗi Session được gán **Timeout Policy cụ thể**
*   Timeout Policy được sử dụng bởi SES‑02
*   Không ảnh hưởng đến các Session khác (trừ khi policy yêu cầu)
*   Có thể ghi Audit Log khi áp dụng policy

**8\. Phạm vi chức năng**

**8.1. Chính sách Timeout theo Session (Per‑Session)**

Mỗi Session có thể có:

*   Idle Timeout riêng
*   Absolute Timeout riêng
*   Sliding policy riêng

Ví dụ:

*   Web session: idle 30m, max 8h
*   Mobile session: idle 24h, max 30d

**8.2. Chính sách theo ngữ cảnh (Context‑Aware)**

Timeout Policy có thể phụ thuộc:

*   Device type (web / mobile)
*   Client / Application
*   Authentication Level (acr)
*   Risk score
*   Location / Network

**8.3. Chính sách theo số lượng Concurrent Session**

Policy có thể:

*   Giảm timeout cho Session mới nếu:
    *   Subject đã có nhiều Session
*   Áp dụng timeout ngắn hơn cho:
    *   Session ít hoạt động
    *   Session rủi ro cao

**8.4. Không chia sẻ trạng thái Timeout**

*   Timeout được tính **độc lập cho từng Session**
*   Hoạt động ở Session A **không gia hạn** Session B

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Session ID

Định danh Session

**2**

Subject ID

User / Client

**3**

Tenant ID

Tenant

**4**

Timeout Policy ID

Chính sách áp dụng

**5**

Idle Timeout

Thời gian không hoạt động

**6**

Absolute Timeout

Tuổi thọ tối đa

**7**

Sliding Enabled

Yes / No

**8**

Policy Source

Default / Admin / Risk

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑SES‑03‑01

Mỗi Session có policy timeout riêng

**2**

BR‑SES‑03‑02

Timeout không được vô hạn

**3**

BR‑SES‑03‑03

Policy gắn theo Tenant

**4**

BR‑SES‑03‑04

Concurrent Session không chia sẻ idle

**5**

BR‑SES‑03‑05

Policy có thể khác nhau giữa các Session

**6**

BR‑SES‑03‑06

Lỗi policy → dùng default secure

**7**

BR‑SES‑03‑07

Không override Absolute Timeout

**8**

BR‑SES‑03‑08

Có thể audit policy

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Session được tạo (SES‑01)
2.  Session Service xác định ngữ cảnh Session
3.  Policy Engine chọn **Session Timeout Policy**
4.  Gán policy cho Session
5.  Lưu policy cùng Session metadata
6.  SES‑02 sử dụng policy để kiểm tra Expiration

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Không tìm thấy policy

Dùng default policy

**2**

Metadata thiếu

Policy fallback

**3**

Thay đổi policy

Áp dụng cho Session mới

**4**

Lỗi engine

Fail‑secure

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Timeout chặt, cấu hình được

**2**

Flexibility

Context‑aware

**3**

Performance

Gán policy nhanh

**4**

Scalability

Nhiều Session song song

**5**

Audit

Truy vết policy

**14\. Ngoài phạm vi (Out of Scope)**

*   Thực thi Expiration (SES‑02)
*   Session Termination (SES‑04)
*   Token Expiration / Revocation
*   Authorization
*   UI cấu hình chi tiết policy

**15\. Ghi chú kiến trúc (QUAN TRỌNG)**

*   **Concurrent Session ≠ Shared Session**
*   Mỗi Session có **vòng đời & timeout độc lập**
*   Đây là cách **Keycloak (per‑client / per‑realm), Auth0, Azure AD** vận hành

### AUTHZ‑01 – Authorization Engine – Central Policy Decision

_(Động cơ Phân quyền Trung tâm – Điều phối Quyết định)_

**1\. Mã chức năng**

**AUTHZ‑01**

**2\. Tên chức năng**

**Authorization Engine – Central Policy Decision**

**3\. Mô tả tổng quát**

Chức năng **Authorization Engine – Central Policy Decision** đóng vai trò **điểm ra quyết định phân quyền tập trung duy nhất (Policy Decision Point – PDP)** cho toàn bộ hệ thống.

AUTHZ‑01 chịu trách nhiệm:

*   Tiếp nhận **Authorization Request** từ các hệ thống nghiệp vụ
*   Điều phối quá trình **đánh giá chính sách phân quyền**
*   Gọi các thành phần chuyên trách:
    *   Policy Evaluation (RBAC / ABAC)
    *   Decision Engine (ALLOW / DENY)
    *   Reason Code Engine
*   Trả về kết quả phân quyền **chuẩn hoá và nhất quán**

Không hệ thống nghiệp vụ nào được phép **tự ra quyết định phân quyền** ngoài AUTHZ‑01.

**4\. Mục tiêu nghiệp vụ**

*   Tập trung hoá toàn bộ logic phân quyền
*   Đảm bảo quyết định truy cập nhất quán trên toàn hệ thống
*   Ngăn chặn bypass phân quyền ở tầng ứng dụng
*   Tăng khả năng audit, compliance và kiểm soát rủi ro

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Business Service / API Gateway

Gửi Authorization Request

**2**

Authorization Engine (PDP)

Điều phối & ra quyết định

**3**

User

Chủ thể truy cập (indirect)

**4**

Auditor (read‑only)

Giám sát quyết định

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   User đã được xác thực thành công (AUTH‑01 → AUTH‑05)
*   Token và Session hợp lệ
*   Tenant tồn tại và ở trạng thái _Active_
*   Authorization Request hợp lệ về cấu trúc
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   Authorization Request được xử lý hoàn chỉnh
*   Quyết định **ALLOW hoặc DENY** được tạo ra
*   (Tuỳ cấu hình) Reason Code được gắn kèm
*   Kết quả sẵn sàng cho Enforcement (AUTHZ‑05)
*   Không thay đổi trạng thái User, Session, Token

**8\. Phạm vi chức năng**

**8.1. Tiếp nhận Authorization Request**

*   Nhận yêu cầu truy cập từ PEP
*   Bao gồm:
    *   Token / Identity Context
    *   Action
    *   Resource
    *   Context bổ sung (nếu có)

**8.2. Điều phối đánh giá chính sách**

*   Kích hoạt các module:
    *   RBAC Evaluation
    *   ABAC Evaluation (nếu áp dụng)
*   Đảm bảo đánh giá theo đúng Tenant

**8.3. Điều phối ra quyết định**

*   Gọi **AUTHZ‑02 – ALLOW / DENY Decision**
*   Gọi **AUTHZ‑03 – Reason Code**
*   Chuẩn hoá kết quả trả về cho PEP

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Authorization Request ID

Định danh yêu cầu

**2**

User ID

Chủ thể truy cập

**3**

Tenant ID

Tenant áp dụng

**4**

Action

Hành động yêu cầu

**5**

Resource

Tài nguyên

**6**

Context

Ngữ cảnh

**7**

Final Decision

ALLOW / DENY

**8**

Reason Code

(Optional)

**9**

Decision Time

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTHZ‑01‑01

Mọi quyết định phân quyền **bắt buộc qua AUTHZ‑01**

**2**

BR‑AUTHZ‑01‑02

Không cho phép quyết định phân quyền phân tán

**3**

BR‑AUTHZ‑01‑03

Vi phạm Tenant Isolation → **DENY**

**4**

BR‑AUTHZ‑01‑04

Token / Session không hợp lệ → **DENY**

**5**

BR‑AUTHZ‑01‑05

Không có policy áp dụng → **DENY**

**6**

BR‑AUTHZ‑01‑06

AUTHZ‑01 không thực thi truy cập

**7**

BR‑AUTHZ‑01‑07

AUTHZ‑01 không định nghĩa policy

**8**

BR‑AUTHZ‑01‑08

Quyết định có thể được **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  PEP gửi Authorization Request tới AUTHZ‑01
2.  AUTHZ‑01 xác thực ngữ cảnh (User, Tenant, Session)
3.  AUTHZ‑01 điều phối RBAC / ABAC Evaluation
4.  AUTHZ‑01 gọi AUTHZ‑02 để ra quyết định ALLOW / DENY
5.  AUTHZ‑01 gọi AUTHZ‑03 để gắn Reason Code
6.  AUTHZ‑01 trả kết quả cho PEP

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Xử lý**

**1**

Request không hợp lệ

**DENY**

**2**

PDP nội bộ lỗi

**DENY (fail‑secure)**

**3**

Thiếu dữ liệu

**DENY**

**4**

Tenant bị Suspend

**DENY**

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Single decision point, fail‑secure

**2**

Consistency

Quyết định thống nhất

**3**

Performance

Độ trễ thấp

**4**

Audit

Truy vết đầy đủ

**14\. Ngoài phạm vi (Out of Scope)**

*   Thực thi truy cập tại ứng dụng
*   Thiết kế chi tiết RBAC / ABAC
*   Quản lý policy
*   Cache quyết định

**15\. Ghi chú**

*   AUTHZ‑01 là **trái tim của Authorization**
*   Là **điểm kiểm soát bắt buộc** trong kiến trúc Zero‑Trust
*   Mọi request truy cập **phải đi vào AUTHZ‑01 trước khi được xử lý**

### AUTHZ‑02 – Authorization Engine – ALLOW / DENY Decision

_(Động cơ Ra Quyết định Cho phép / Từ chối Truy cập)_

**1\. Mã chức năng**

**AUTHZ‑02**

**2\. Tên chức năng**

**Authorization Engine – ALLOW / DENY Decision**

**3\. Mô tả tổng quát**

Chức năng **Authorization Engine – ALLOW / DENY Decision** chịu trách nhiệm **đưa ra quyết định phân quyền cuối cùng, bắt buộc và nhị phân** cho mọi yêu cầu truy cập trong hệ thống.

Authorization Engine:

*   Nhận **kết quả đánh giá chính sách** từ các lớp policy (RBAC, ABAC, Context)
*   Áp dụng **quy tắc kết hợp quyết định (decision combining rules)**
*   Sinh ra **một và chỉ một kết quả cuối cùng**:
    *   **ALLOW** – Cho phép truy cập
    *   **DENY** – Từ chối truy cập

AUTHZ‑02 là **điểm chốt bảo mật (Security Gate)** của Authorization, nơi mọi logic phân quyền **phải kết thúc** trước khi chuyển sang **Policy Enforcement (AUTHZ‑05)**.

**4\. Mục tiêu nghiệp vụ**

*   Chuẩn hoá hành vi ra quyết định phân quyền
*   Đảm bảo **default‑deny** và **fail‑secure**
*   Loại bỏ mọi trạng thái quyết định mơ hồ
*   Tạo nền tảng vững chắc cho audit và compliance

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

IAM System (Authorization Engine / PDP)

Ra quyết định ALLOW / DENY

**2**

Business Service / API Gateway (PEP)

Tiêu thụ quyết định

**3**

User

Chủ thể truy cập (indirect)

**4**

Auditor (read‑only)

Giám sát quyết định

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Authorization Request đã được tiếp nhận
*   Token và Session hợp lệ
*   User và Tenant đã được xác định
*   Kết quả đánh giá policy (RBAC / ABAC / Context) đã sẵn sàng
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   Một quyết định **ALLOW hoặc DENY** được sinh ra
*   Quyết định **không thể bị thay đổi** bởi các lớp phía sau
*   Quyết định sẵn sàng cho Enforcement (AUTHZ‑05)
*   Không thay đổi trạng thái User, Session, Token

**8\. Phạm vi chức năng**

**8.1. Tổng hợp kết quả đánh giá**

*   Nhận kết quả từ:
    *   RBAC Evaluation
    *   ABAC Evaluation (nếu áp dụng)
    *   Kiểm tra trạng thái User / Tenant / Session

**8.2. Áp dụng quy tắc quyết định**

*   Áp dụng logic kết hợp chính sách
*   Ưu tiên an toàn (**fail‑secure**)

**8.3. Sinh quyết định cuối cùng**

*   Trả về **ALLOW** hoặc **DENY**
*   Không tồn tại trạng thái trung gian (_Permit with Condition_, _Partial Allow_, …)

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Authorization Request ID

Định danh yêu cầu

**2**

User ID

Chủ thể truy cập

**3**

Tenant ID

Tenant áp dụng

**4**

Action

Hành động yêu cầu

**5**

Resource

Tài nguyên truy cập

**6**

RBAC Result

Permit / Not Permit

**7**

ABAC Result

True / False / Not Evaluated

**8**

Final Decision

**ALLOW / DENY**

**9**

Decision Time

Thời điểm quyết định

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTHZ‑02‑01

Quyết định **chỉ có ALLOW hoặc DENY**

**2**

BR‑AUTHZ‑02‑02

**DENY là mặc định** nếu thiếu thông tin

**3**

BR‑AUTHZ‑02‑03

RBAC không thoả → **DENY**

**4**

BR‑AUTHZ‑02‑04

ABAC không thoả → **DENY**

**5**

BR‑AUTHZ‑02‑05

User _Suspended_ → **DENY**

**6**

BR‑AUTHZ‑02‑06

Tenant _Suspended_ → **DENY**

**7**

BR‑AUTHZ‑02‑07

Vi phạm Tenant Isolation → **DENY**

**8**

BR‑AUTHZ‑02‑08

Lỗi đánh giá policy → **DENY (fail‑secure)**

**9**

BR‑AUTHZ‑02‑09

Quyết định không được chỉnh sửa bởi PEP

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Authorization Engine nhận kết quả RBAC / ABAC
2.  Kiểm tra trạng thái User, Tenant, Session
3.  Áp dụng quy tắc **default‑deny**
4.  Tổng hợp kết quả theo logic kết hợp
5.  Sinh quyết định **ALLOW hoặc DENY**
6.  Chuyển quyết định sang AUTHZ‑03 (Reason Code)
7.  Trả kết quả cho PEP (AUTHZ‑05)

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Quyết định**

**1**

Không có policy áp dụng

**DENY**

**2**

Thiếu thuộc tính

**DENY**

**3**

Kết quả đánh giá mâu thuẫn

**DENY**

**4**

Lỗi hệ thống

**DENY**

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Default‑deny, fail‑secure

**2**

Consistency

Quyết định nhị phân, nhất quán

**3**

Reliability

Không trạng thái mơ hồ

**4**

Audit

Quyết định có thể truy vết

**14\. Ngoài phạm vi (Out of Scope)**

*   Thực thi truy cập tại Business Service
*   Giải thích chi tiết logic policy cho end‑user
*   Risk‑based / score‑based authorization

**15\. Ghi chú**

*   AUTHZ‑02 là **lõi ra quyết định của Authorization Engine**
*   Đây là **ranh giới cứng** giữa _Policy Evaluation_ và _Policy Enforcement_
*   Mọi truy cập hệ thống **bắt buộc phải kết thúc tại ALLOW / DENY**

### AUTHZ‑03 – Authorization Engine – Reason Code

_(Mã Lý do Quyết định Phân quyền)_

**1\. Mã chức năng**

**AUTHZ‑03**

**2\. Tên chức năng**

**Authorization Engine – Reason Code**

**3\. Mô tả tổng quát**

Chức năng **Authorization Engine – Reason Code** cung cấp cơ chế **chuẩn hoá, gán và trả về mã lý do (Reason Code)** cho mỗi quyết định phân quyền **ALLOW / DENY** được tạo ra bởi **Authorization Engine (PDP)**.

Reason Code:

*   **Không thay đổi quyết định ALLOW / DENY**
*   **Không tiết lộ logic chính sách chi tiết**
*   Được sử dụng cho:
    *   Audit & Compliance
    *   Debug & vận hành
    *   Giải trình với kiểm toán / SOC
    *   Thống kê và phân tích truy cập

Reason Code là **metadata bắt buộc** đi kèm quyết định phân quyền trong môi trường Enterprise / Zero‑Trust.

**4\. Mục tiêu nghiệp vụ**

*   Chuẩn hoá lý do từ chối / cho phép truy cập
*   Tăng khả năng truy vết và giải trình quyết định
*   Hỗ trợ vận hành và điều tra sự cố bảo mật
*   Đáp ứng yêu cầu kiểm toán và tuân thủ

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

IAM System (Authorization Engine / PDP)

Sinh Reason Code

**2**

Business Service (PEP)

Tiêu thụ Reason Code (read‑only)

**3**

Security / Ops Team

Phân tích lý do

**4**

Auditor (read‑only)

Kiểm toán quyết định

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Authorization Request đã được xử lý
*   Quyết định **ALLOW hoặc DENY** đã được tạo (AUTHZ‑02)
*   Kết quả đánh giá policy (RBAC / ABAC) sẵn có
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   Một **Reason Code hợp lệ** được gán cho quyết định
*   Reason Code được trả về kèm quyết định (nếu cấu hình)
*   Reason Code có thể được ghi Audit Log
*   Không thay đổi trạng thái hệ thống

**8\. Phạm vi chức năng**

**8.1. Sinh Reason Code**

*   Ánh xạ kết quả đánh giá sang mã lý do chuẩn
*   Mỗi quyết định có **tối thiểu một Reason Code chính**

**8.2. Chuẩn hoá Reason Code**

*   Reason Code ở dạng **code‑based**, không phải text tự do
*   Không phụ thuộc implementation chi tiết

**8.3. Gắn Reason Code với Decision**

*   Reason Code là metadata đi kèm ALLOW / DENY
*   PEP **không được sửa đổi** Reason Code

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Authorization Request ID

Định danh yêu cầu

**2**

Final Decision

ALLOW / DENY

**3**

Reason Code

Mã lý do chuẩn

**4**

Reason Category

Nhóm lý do

**5**

User ID

Chủ thể truy cập

**6**

Tenant ID

Tenant áp dụng

**7**

Policy Reference

(Optional)

**8**

Decision Time

Thời điểm

**10\. Danh mục Reason Code chuẩn (tham chiếu)**

**10.1. Nhóm Identity & Session**

**#**

**Code**

**Mô tả**

**1**

RC‑AUTH‑001

Invalid Token

**2**

RC‑AUTH‑002

Session Expired

**3**

RC‑AUTH‑003

User Suspended

**4**

RC‑AUTH‑004

Tenant Suspended

**10.2. Nhóm RBAC**

**#**

**Code**

**Mô tả**

**1**

RC‑RBAC‑001

No Role Assigned

**2**

RC‑RBAC‑002

Role Not Permitted

**3**

RC‑RBAC‑003

Permission Not Found

**10.3. Nhóm ABAC**

**#**

**Code**

**Mô tả**

**1**

RC‑ABAC‑001

Missing Required Attribute

**2**

RC‑ABAC‑002

Attribute Condition Not Met

**3**

RC‑ABAC‑003

Context Constraint Failed

**10.4. Nhóm Policy & System**

**#**

**Code**

**Mô tả**

**1**

RC‑POL‑001

No Applicable Policy

**2**

RC‑POL‑002

Policy Evaluation Error

**3**

RC‑SYS‑001

Authorization Engine Error

**11\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTHZ‑03‑01

Mọi quyết định **phải có Reason Code**

**2**

BR‑AUTHZ‑03‑02

Reason Code **không thay đổi** ALLOW / DENY

**3**

BR‑AUTHZ‑03‑03

DENY → Reason Code **bắt buộc**

**4**

BR‑AUTHZ‑03‑04

Default‑deny → Reason Code tương ứng

**5**

BR‑AUTHZ‑03‑05

PEP không được chỉnh sửa Reason Code

**6**

BR‑AUTHZ‑03‑06

Reason Code không được tiết lộ policy nội bộ

**7**

BR‑AUTHZ‑03‑07

Reason Code có thể được **ghi Audit Log**

**12\. Luồng nghiệp vụ chính (Main Flow)**

1.  PDP hoàn tất quyết định ALLOW / DENY
2.  PDP xác định nguyên nhân chính
3.  PDP ánh xạ sang Reason Code chuẩn
4.  PDP gắn Reason Code vào kết quả
5.  Trả Decision + Reason Code cho PEP
6.  (Tuỳ cấu hình) Ghi Audit Log

**13\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Xử lý**

**1**

Nhiều nguyên nhân

Chọn **primary reason code**

**2**

Lỗi không xác định

RC‑SYS‑001

**3**

Thiếu dữ liệu

RC‑POL‑001

**14\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Audit

Giải trình rõ ràng

**2**

Security

Không rò rỉ logic policy

**3**

Observability

Hỗ trợ debug

**4**

Consistency

Reason Code chuẩn hoá

**15\. Ngoài phạm vi (Out of Scope)**

*   Thông báo lỗi chi tiết cho end‑user
*   Mapping Reason Code sang UI message
*   Risk score / weighted decision

**16\. Ghi chú**

*   AUTHZ‑03 là **lớp Explainability** của Authorization
*   Bắt buộc trong môi trường **Enterprise / Zero‑Trust / Audit‑driven**
*   Tăng mạnh khả năng **SOC, SIEM, Compliance**

### AUTHZ‑04 – RBAC – System Role Management

_(Quản lý Vai trò Hệ thống – RBAC)_

**1\. Mã chức năng**

**AUTHZ‑04**

**2\. Tên chức năng**

**RBAC – System Role Management**

**3\. Mô tả tổng quát**

Chức năng **RBAC – System Role Management** cung cấp cơ chế **định nghĩa, quản lý và kiểm soát vòng đời các System Role** được sử dụng trong mô hình **Role‑Based Access Control (RBAC)** của hệ thống IAM.

System Role:

*   Đại diện cho **vai trò chuẩn hoá ở cấp hệ thống hoặc tenant**
*   Là **nguồn dữ liệu đầu vào** cho Authorization Engine
*   **Không tự ra quyết định ALLOW / DENY**
*   Được **đánh giá và sử dụng bởi AUTHZ‑01 / AUTHZ‑02**

AUTHZ‑04 đảm bảo rằng **vai trò được quản lý tập trung, nhất quán và có kiểm soát**, tránh việc gán quyền trực tiếp hoặc phân tán logic phân quyền ở các hệ thống nghiệp vụ.

**4\. Mục tiêu nghiệp vụ**

*   Chuẩn hoá mô hình phân quyền dựa trên vai trò
*   Giảm độ phức tạp trong quản lý quyền
*   Đảm bảo nguyên tắc **Least Privilege**
*   Hỗ trợ audit, compliance và mở rộng RBAC

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

System Admin

Quản lý System Role toàn hệ thống

**2**

Tenant Admin

Quản lý Role trong Tenant

**3**

Authorization Engine

Tiêu thụ Role để đánh giá quyền

**4**

Auditor (read‑only)

Kiểm toán vai trò và thay đổi

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được xác thực và có quyền quản lý Role
*   Tenant tồn tại và ở trạng thái _Active_
*   Tuân thủ **Tenant Isolation (IDM‑04)**
*   Chính sách RBAC được kích hoạt

**7\. Điều kiện hậu (Post‑conditions)**

*   Role được tạo / cập nhật / vô hiệu hoá theo yêu cầu
*   Thay đổi Role **không làm thay đổi session hiện tại**
*   Role chỉ có hiệu lực khi ở trạng thái _Active_
*   Mọi thay đổi được ghi Audit Log

**8\. Phạm vi chức năng**

**8.1. Định nghĩa System Role**

*   Tạo Role với:
    *   Role ID
    *   Role Name
    *   Scope (System / Tenant)
*   Role được định nghĩa **tập trung tại IAM**

**8.2. Quản lý vòng đời Role**

*   Trạng thái Role:
    *   Active
    *   Inactive
    *   Deprecated
*   Role _Inactive_ / _Deprecated_ **không được dùng cho authorization mới**

**8.3. Gán Role cho User**

*   User có thể có **một hoặc nhiều Role**
*   Gán Role không thay đổi trạng thái xác thực
*   Gán Role tuân thủ Tenant Isolation

**8.4. Quản lý Permission gắn với Role**

*   Role là tập hợp các Permission logic
*   Permission **không gán trực tiếp cho User**

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Role ID

Định danh vai trò

**2**

Role Name

Tên vai trò

**3**

Role Scope

System / Tenant

**4**

Tenant ID

Tenant sở hữu (nếu có)

**5**

Role Status

Active / Inactive / Deprecated

**6**

Permission Set

Tập quyền

**7**

Assigned Users

Danh sách User

**8**

Created / Updated By

Actor

**9**

Timestamp

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTHZ‑04‑01

Role phải thuộc **đúng Scope và Tenant**

**2**

BR‑AUTHZ‑04‑02

User chỉ được gán Role trong Tenant của mình

**3**

BR‑AUTHZ‑04‑03

Role _Inactive_ → không dùng cho authorization

**4**

BR‑AUTHZ‑04‑04

Không gán Permission trực tiếp cho User

**5**

BR‑AUTHZ‑04‑05

Thay đổi Role **không làm gián đoạn session**

**6**

BR‑AUTHZ‑04‑06

Role hệ thống chỉ sửa bởi System Admin

**7**

BR‑AUTHZ‑04‑07

Mọi thay đổi Role phải **ghi Audit Log**

**8**

BR‑AUTHZ‑04‑08

Vi phạm Tenant Isolation → từ chối thao tác

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. Tạo System Role**

1.  Admin chọn **Create Role**
2.  Nhập thông tin Role
3.  IAM validate dữ liệu
4.  Lưu Role ở trạng thái _Active_
5.  Ghi Audit Log

**11.2. Gán Role cho User**

1.  Admin chọn User
2.  Chọn Role hợp lệ
3.  IAM kiểm tra Tenant & Scope
4.  Gán Role
5.  Ghi Audit Log

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Xử lý**

**1**

Không đủ quyền

Từ chối thao tác

**2**

Role không tồn tại

Trả lỗi

**3**

Role không Active

Không cho gán

**4**

Tenant bị Suspend

Từ chối thao tác

**5**

Lỗi hệ thống

Trả lỗi hệ thống

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Least privilege

**2**

Consistency

Role chuẩn hoá

**3**

Audit

Truy vết thay đổi

**4**

Scalability

Hỗ trợ nhiều Tenant

**14\. Ngoài phạm vi (Out of Scope)**

*   Logic quyết định ALLOW / DENY
*   ABAC / Context‑based policy
*   Enforcement tại ứng dụng
*   UI/UX chi tiết

**15\. Ghi chú**

*   AUTHZ‑04 là **nguồn dữ liệu RBAC**, không phải Decision Engine
*   Role Management **tách biệt hoàn toàn** với Authorization Decision
*   Là nền tảng cho mô hình **RBAC chuẩn Enterprise**

### AUTHZ‑05 – RBAC – Custom Role Management

_(Quản lý Vai trò Tuỳ biến theo Tenant – RBAC)_

**1\. Mã chức năng**

**AUTHZ‑05**

**2\. Tên chức năng**

**RBAC – Custom Role Management**

**3\. Mô tả tổng quát**

Chức năng **RBAC – Custom Role Management** cho phép **Tenant Admin định nghĩa, quản lý và gán các Custom Role** (vai trò tuỳ biến) nhằm đáp ứng **nhu cầu phân quyền đặc thù của từng Tenant**, dựa trên nền tảng **RBAC chuẩn hoá của hệ thống**.

Custom Role:

*   Chỉ tồn tại **trong phạm vi một Tenant**
*   Được xây dựng từ **Permission chuẩn của hệ thống**
*   Là **nguồn dữ liệu đầu vào** cho Authorization Engine
*   **Không tự ra quyết định ALLOW / DENY**

AUTHZ‑05 đảm bảo tính **linh hoạt cho Tenant** nhưng vẫn giữ **kiểm soát tập trung, an toàn và có thể audit**.

**4\. Mục tiêu nghiệp vụ**

*   Cho phép Tenant tự cấu hình phân quyền theo nghiệp vụ riêng
*   Tránh việc phải tạo quá nhiều System Role
*   Đảm bảo phân quyền linh hoạt nhưng không phá vỡ mô hình bảo mật
*   Hỗ trợ audit và tuân thủ đa Tenant

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Tenant Admin

Tạo & quản lý Custom Role

**2**

Authorization Engine

Tiêu thụ Custom Role để đánh giá quyền

**3**

User

Được gán Custom Role

**4**

Auditor (read‑only)

Kiểm toán vai trò

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Tenant Admin đã được xác thực và phân quyền
*   Tenant tồn tại và ở trạng thái _Active_
*   Tuân thủ **Tenant Isolation (IDM‑04)**
*   Permission catalogue của hệ thống đã sẵn sàng

**7\. Điều kiện hậu (Post‑conditions)**

*   Custom Role được tạo / cập nhật / vô hiệu hoá
*   Gán Custom Role **không làm gián đoạn session hiện tại**
*   Custom Role chỉ có hiệu lực khi ở trạng thái _Active_
*   Mọi thay đổi được ghi Audit Log

**8\. Phạm vi chức năng**

**8.1. Tạo Custom Role**

*   Tenant Admin có thể:
    *   Đặt tên Custom Role
    *   Chọn tập Permission từ danh mục cho phép
*   Custom Role được gắn **Tenant ID bắt buộc**

**8.2. Quản lý vòng đời Custom Role**

*   Trạng thái Custom Role:
    *   Active
    *   Inactive
    *   Deprecated
*   Role _Inactive / Deprecated_ không được dùng cho authorization mới

**8.3. Gán Custom Role cho User**

*   User có thể có **nhiều Custom Role**
*   Có thể đồng thời có:
    *   System Role
    *   Custom Role
*   Quyền được **hợp nhất theo RBAC**

**8.4. Giới hạn quyền của Custom Role**

*   Chỉ được dùng Permission:
    *   Thuộc Tenant
    *   Hoặc được hệ thống cho phép override
*   Không được tạo Permission mới

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Custom Role ID

Định danh vai trò

**2**

Role Name

Tên vai trò

**3**

Tenant ID

Tenant sở hữu

**4**

Role Status

Active / Inactive / Deprecated

**5**

Permission Set

Tập Permission

**6**

Assigned Users

Danh sách User

**7**

Created / Updated By

Tenant Admin

**8**

Timestamp

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTHZ‑05‑01

Custom Role **bắt buộc thuộc một Tenant**

**2**

BR‑AUTHZ‑05‑02

Tenant Admin chỉ quản lý Role của Tenant mình

**3**

BR‑AUTHZ‑05‑03

Custom Role không được vượt quyền System Role

**4**

BR‑AUTHZ‑05‑04

Không tạo Permission mới trong Custom Role

**5**

BR‑AUTHZ‑05‑05

Role _Inactive_ → không dùng cho authorization

**6**

BR‑AUTHZ‑05‑06

Gán Role không làm thay đổi session

**7**

BR‑AUTHZ‑05‑07

Vi phạm Tenant Isolation → từ chối

**8**

BR‑AUTHZ‑05‑08

Mọi thay đổi Role phải **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. Tạo Custom Role**

1.  Tenant Admin chọn **Create Custom Role**
2.  Nhập tên Role
3.  Chọn Permission từ danh mục cho phép
4.  IAM validate Tenant & Permission scope
5.  Lưu Role ở trạng thái _Active_
6.  Ghi Audit Log

**11.2. Gán Custom Role cho User**

1.  Tenant Admin chọn User
2.  Chọn Custom Role hợp lệ
3.  IAM kiểm tra Tenant & Role status
4.  Gán Role cho User
5.  Ghi Audit Log

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Xử lý**

**1**

Không đủ quyền

Từ chối thao tác

**2**

Permission không hợp lệ

Từ chối

**3**

Role không tồn tại

Trả lỗi

**4**

Tenant bị Suspend

Từ chối

**5**

Lỗi hệ thống

Trả lỗi hệ thống

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Không vượt quyền

**2**

Isolation

Tách biệt Tenant

**3**

Audit

Truy vết đầy đủ

**4**

Scalability

Hỗ trợ nhiều Custom Role

**14\. Ngoài phạm vi (Out of Scope)**

*   Logic ALLOW / DENY Decision
*   ABAC / Context‑based policy
*   Enforcement tại ứng dụng
*   UI/UX chi tiết

**15\. Ghi chú**

*   AUTHZ‑05 bổ sung **tính linh hoạt cho RBAC đa Tenant**
*   Custom Role **luôn bị ràng buộc bởi System Role & Permission catalogue**
*   Là lớp **cấu hình**, không phải **quyết định**

### AUTHZ‑06 – RBAC – Role Assignment

_(Gán Vai trò cho Người dùng – RBAC)_

**1\. Mã chức năng**

**AUTHZ‑06**

**2\. Tên chức năng**

**RBAC – Role Assignment**

**3\. Mô tả tổng quát**

Chức năng **RBAC – Role Assignment** cung cấp cơ chế **gán, thu hồi và quản lý mối quan hệ giữa User và Role** (System Role và Custom Role) trong mô hình **Role‑Based Access Control (RBAC)**.

Role Assignment:

*   Xác định **User có những Role nào tại thời điểm đánh giá**
*   Là **dữ liệu đầu vào bắt buộc** cho Authorization Engine
*   **Không tự sinh quyền**, **không ra quyết định ALLOW / DENY**
*   Hoạt động **theo Tenant**, tuân thủ Tenant Isolation

AUTHZ‑06 đảm bảo rằng **phân quyền dựa trên Role được áp dụng chính xác, nhất quán và có thể audit**.

**4\. Mục tiêu nghiệp vụ**

*   Gán quyền cho User một cách có kiểm soát
*   Đảm bảo nguyên tắc **Least Privilege**
*   Hỗ trợ mô hình **đa Role / đa Tenant**
*   Tăng khả năng truy vết và kiểm toán phân quyền

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

System Admin

Gán System Role

**2**

Tenant Admin

Gán Custom Role trong Tenant

**3**

Authorization Engine

Tiêu thụ Role Assignment

**4**

User

Chủ thể được gán Role

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được xác thực và có quyền gán Role
*   User tồn tại và ở trạng thái _Active_
*   Role tồn tại và ở trạng thái _Active_
*   Tenant tồn tại và ở trạng thái _Active_
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   Role được gán hoặc thu hồi khỏi User
*   Thay đổi Role Assignment **không làm gián đoạn session hiện tại**
*   Role Assignment có hiệu lực cho các lần authorization tiếp theo
*   Thao tác được ghi Audit Log

**8\. Phạm vi chức năng**

**8.1. Gán Role cho User**

*   Một User có thể có:
    *   Nhiều System Role
    *   Nhiều Custom Role
*   Role được gán theo **Tenant context**

**8.2. Thu hồi Role**

*   Cho phép loại bỏ Role khỏi User
*   Thu hồi **không làm mất session hiện tại**
*   Áp dụng cho authorization tiếp theo

**8.3. Xem danh sách Role Assignment**

*   Truy vấn Role theo User
*   Truy vấn User theo Role (read‑only)

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Assignment ID

Định danh

**2**

User ID

Người dùng

**3**

Role ID

Vai trò

**4**

Role Type

System / Custom

**5**

Tenant ID

Tenant áp dụng

**6**

Assignment Status

Active / Revoked

**7**

Assigned By

Actor

**8**

Assigned Time

Thời điểm

**9**

Revoked Time

(Optional)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTHZ‑06‑01

Role Assignment **bắt buộc theo Tenant**

**2**

BR‑AUTHZ‑06‑02

User chỉ nhận Role thuộc Tenant của mình

**3**

BR‑AUTHZ‑06‑03

Role _Inactive / Deprecated_ → không được gán

**4**

BR‑AUTHZ‑06‑04

System Role chỉ gán bởi System Admin

**5**

BR‑AUTHZ‑06‑05

Custom Role chỉ gán bởi Tenant Admin

**6**

BR‑AUTHZ‑06‑06

Gán / thu hồi Role **không làm logout User**

**7**

BR‑AUTHZ‑06‑07

Mọi thay đổi Role Assignment phải **ghi Audit Log**

**8**

BR‑AUTHZ‑06‑08

Vi phạm Tenant Isolation → từ chối

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. Gán Role cho User**

1.  Admin chọn User
2.  Chọn Role hợp lệ
3.  IAM kiểm tra Tenant, Role Status, Actor quyền hạn
4.  Tạo Role Assignment
5.  Ghi Audit Log

**11.2. Thu hồi Role**

1.  Admin chọn Role Assignment
2.  Thực hiện **Revoke**
3.  IAM cập nhật trạng thái Assignment
4.  Ghi Audit Log

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Xử lý**

**1**

Không đủ quyền

Từ chối

**2**

User không tồn tại

Trả lỗi

**3**

Role không tồn tại

Trả lỗi

**4**

Role không Active

Không cho gán

**5**

Tenant bị Suspend

Từ chối

**6**

Lỗi hệ thống

Trả lỗi hệ thống

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Least privilege

**2**

Consistency

Role áp dụng nhất quán

**3**

Audit

Truy vết đầy đủ

**4**

Scalability

Hỗ trợ nhiều Role / User

**14\. Ngoài phạm vi (Out of Scope)**

*   Định nghĩa Role hoặc Permission
*   Logic ALLOW / DENY Decision
*   ABAC / Context‑based authorization
*   Enforcement tại ứng dụng
*   UI/UX chi tiết

**15\. Ghi chú**

*   AUTHZ‑06 là **cầu nối giữa RBAC configuration và Authorization Engine**
*   Role Assignment **chỉ là dữ liệu**, không phải quyết định
*   Là điểm kiểm soát quan trọng cho **audit & compliance**

### AUTHZ‑07 – RBAC – Permission Mapping

_(Ánh xạ Quyền → Hành động / Tài nguyên – RBAC)_

**1\. Mã chức năng**

**AUTHZ‑07**

**2\. Tên chức năng**

**RBAC – Permission Mapping**

**3\. Mô tả tổng quát**

Chức năng **RBAC – Permission Mapping** cung cấp cơ chế **định nghĩa và quản lý mối quan hệ giữa Permission logic và Action / Resource cụ thể** trong hệ thống.

Permission Mapping:

*   Là lớp **chuẩn hoá quyền truy cập**
*   Xác định rõ **Permission cho phép làm gì trên tài nguyên nào**
*   Là **đầu vào trực tiếp** cho Authorization Engine khi đánh giá RBAC
*   **Không gán trực tiếp cho User**
*   **Không tự ra quyết định ALLOW / DENY**

AUTHZ‑07 đóng vai trò **cầu nối kỹ thuật** giữa mô hình RBAC (Role → Permission) và **Authorization Request (Action / Resource)**.

**4\. Mục tiêu nghiệp vụ**

*   Chuẩn hoá định nghĩa Permission trên toàn hệ thống
*   Đảm bảo ánh xạ quyền nhất quán giữa các dịch vụ
*   Giảm rủi ro sai lệch phân quyền giữa thiết kế và triển khai
*   Hỗ trợ audit, compliance và mở rộng hệ thống

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

System Admin

Định nghĩa & quản lý Permission Mapping

**2**

Authorization Engine

Tiêu thụ Permission Mapping

**3**

Business Service

Tham chiếu Action / Resource

**4**

Auditor (read‑only)

Kiểm toán Permission

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được xác thực và có quyền quản lý Permission
*   Danh mục Action / Resource đã được định nghĩa
*   Tenant tồn tại và ở trạng thái _Active_
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   Permission Mapping được tạo / cập nhật / vô hiệu hoá
*   Mapping có hiệu lực cho các lần authorization tiếp theo
*   Thay đổi mapping **không làm gián đoạn session hiện tại**
*   Mọi thay đổi được ghi Audit Log

**8\. Phạm vi chức năng**

**8.1. Định nghĩa Permission**

*   Permission là thực thể logic, ví dụ:
    *   USER\_VIEW
    *   ORDER\_APPROVE
*   Permission **không phụ thuộc trực tiếp User**

**8.2. Ánh xạ Permission → Action / Resource**

*   Một Permission có thể ánh xạ tới:
    *   Một hoặc nhiều Action
    *   Một hoặc nhiều Resource
*   Mapping có thể theo pattern (ví dụ: order:\*)

**8.3. Quản lý vòng đời Permission Mapping**

*   Trạng thái:
    *   Active
    *   Inactive
    *   Deprecated
*   Mapping _Inactive / Deprecated_ không được dùng cho authorization mới

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Permission ID

Định danh quyền

**2**

Permission Code

Mã quyền

**3**

Action

Hành động được phép

**4**

Resource

Tài nguyên

**5**

Tenant Scope

System / Tenant

**6**

Mapping Status

Active / Inactive / Deprecated

**7**

Created / Updated By

Actor

**8**

Timestamp

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTHZ‑07‑01

Permission Mapping **định nghĩa duy nhất bởi hệ thống**

**2**

BR‑AUTHZ‑07‑02

Permission không gán trực tiếp cho User

**3**

BR‑AUTHZ‑07‑03

Role chỉ chứa Permission hợp lệ

**4**

BR‑AUTHZ‑07‑04

Mapping _Inactive_ → không dùng cho authorization

**5**

BR‑AUTHZ‑07‑05

Một Action / Resource có thể thuộc nhiều Permission

**6**

BR‑AUTHZ‑07‑06

Thay đổi Mapping không làm logout User

**7**

BR‑AUTHZ‑07‑07

Vi phạm Tenant Isolation → từ chối

**8**

BR‑AUTHZ‑07‑08

Mọi thay đổi Mapping phải **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. Tạo Permission Mapping**

1.  System Admin chọn **Create Permission**
2.  Nhập Permission Code
3.  Ánh xạ Action / Resource
4.  IAM validate dữ liệu
5.  Lưu Mapping ở trạng thái _Active_
6.  Ghi Audit Log

**11.2. Cập nhật Permission Mapping**

1.  Admin chỉnh sửa Mapping
2.  IAM kiểm tra ảnh hưởng
3.  Cập nhật Mapping
4.  Ghi Audit Log

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Xử lý**

**1**

Không đủ quyền

Từ chối

**2**

Permission trùng

Trả lỗi

**3**

Action / Resource không tồn tại

Trả lỗi

**4**

Mapping không Active

Không cho dùng

**5**

Tenant bị Suspend

Từ chối

**6**

Lỗi hệ thống

Trả lỗi hệ thống

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Quyền được chuẩn hoá

**2**

Consistency

Mapping nhất quán

**3**

Audit

Truy vết thay đổi

**4**

Scalability

Hỗ trợ nhiều Permission

**14\. Ngoài phạm vi (Out of Scope)**

*   Gán Permission trực tiếp cho User
*   Logic ALLOW / DENY Decision
*   ABAC / Context‑based authorization
*   Enforcement tại ứng dụng
*   UI/UX chi tiết

**15\. Ghi chú**

*   AUTHZ‑07 là **lớp nền tảng kỹ thuật của RBAC**
*   Permission Mapping là **điểm nối giữa Business API và IAM**
*   Thiết kế sai Permission Mapping → rủi ro bảo mật nghiêm trọng

### AUTHZ‑08 – ABAC – Scope Definition

_(Định nghĩa Phạm vi & Ngữ cảnh Thuộc tính – ABAC)_

**1\. Mã chức năng**

**AUTHZ‑08**

**2\. Tên chức năng**

**ABAC – Scope Definition**

**3\. Mô tả tổng quát**

Chức năng **ABAC – Scope Definition** cung cấp cơ chế **định nghĩa, quản lý và chuẩn hoá các Scope (phạm vi áp dụng)** cho mô hình **Attribute‑Based Access Control (ABAC)**.

Scope xác định:

*   **Những thuộc tính nào** được phép dùng trong đánh giá ABAC
*   **Thuộc tính áp dụng cho đối tượng nào** (Subject, Resource, Action, Environment)
*   **Phạm vi hiệu lực** (System / Tenant / Context cụ thể)

AUTHZ‑08 đảm bảo rằng ABAC:

*   Có **ranh giới rõ ràng**
*   Không sử dụng thuộc tính tuỳ tiện
*   Có thể **kiểm soát, audit và mở rộng an toàn**

**4\. Mục tiêu nghiệp vụ**

*   Chuẩn hoá việc sử dụng thuộc tính trong ABAC
*   Ngăn chặn lạm dụng hoặc dùng sai thuộc tính
*   Đảm bảo ABAC nhất quán giữa các dịch vụ
*   Hỗ trợ audit, compliance và Zero‑Trust

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

System Admin

Định nghĩa ABAC Scope hệ thống

**2**

Tenant Admin

Định nghĩa Scope trong Tenant (nếu cho phép)

**3**

Authorization Engine

Tiêu thụ Scope khi đánh giá ABAC

**4**

Auditor (read‑only)

Kiểm toán Scope

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được xác thực và có quyền cấu hình ABAC
*   Tenant tồn tại và ở trạng thái _Active_
*   Danh mục Attribute đã được định nghĩa
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   Scope được tạo / cập nhật / vô hiệu hoá
*   Scope có hiệu lực cho các lần authorization tiếp theo
*   Thay đổi Scope **không làm gián đoạn session hiện tại**
*   Mọi thay đổi được ghi Audit Log

**8\. Phạm vi chức năng**

**8.1. Định nghĩa ABAC Scope**

Mỗi Scope bao gồm:

*   Scope ID
*   Scope Name
*   Scope Type:
    *   Subject Scope
    *   Resource Scope
    *   Action Scope
    *   Environment Scope

**8.2. Gán Attribute vào Scope**

*   Mỗi Scope chỉ chứa **Attribute hợp lệ**
*   Attribute có thể là:
    *   User attribute (department, level, …)
    *   Resource attribute (owner, classification, …)
    *   Environment attribute (time, location, device, …)

**8.3. Phạm vi hiệu lực Scope**

*   System Scope: dùng toàn hệ thống
*   Tenant Scope: chỉ dùng trong Tenant
*   Context Scope: dùng cho ngữ cảnh đặc biệt (ví dụ: API nội bộ)

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Scope ID

Định danh Scope

**2**

Scope Name

Tên Scope

**3**

Scope Type

Subject / Resource / Action / Environment

**4**

Attribute List

Danh sách Attribute

**5**

Scope Level

System / Tenant

**6**

Tenant ID

(nếu Tenant Scope)

**7**

Scope Status

Active / Inactive / Deprecated

**8**

Created / Updated By

Actor

**9**

Timestamp

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTHZ‑08‑01

ABAC Attribute **bắt buộc thuộc một Scope**

**2**

BR‑AUTHZ‑08‑02

Scope _Inactive_ → không dùng cho ABAC

**3**

BR‑AUTHZ‑08‑03

Tenant không dùng Scope của Tenant khác

**4**

BR‑AUTHZ‑08‑04

Scope hệ thống chỉ sửa bởi System Admin

**5**

BR‑AUTHZ‑08‑05

Attribute ngoài Scope → **không được đánh giá**

**6**

BR‑AUTHZ‑08‑06

Thay đổi Scope không làm logout User

**7**

BR‑AUTHZ‑08‑07

Vi phạm Tenant Isolation → từ chối

**8**

BR‑AUTHZ‑08‑08

Mọi thay đổi Scope phải **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. Tạo ABAC Scope**

1.  Admin chọn **Create ABAC Scope**
2.  Nhập Scope Name & Type
3.  Chọn Attribute hợp lệ
4.  IAM validate Scope & Tenant
5.  Lưu Scope ở trạng thái _Active_
6.  Ghi Audit Log

**11.2. Cập nhật Scope**

1.  Admin chỉnh sửa Attribute trong Scope
2.  IAM kiểm tra ảnh hưởng
3.  Cập nhật Scope
4.  Ghi Audit Log

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Xử lý**

**1**

Không đủ quyền

Từ chối

**2**

Attribute không hợp lệ

Từ chối

**3**

Scope trùng

Trả lỗi

**4**

Scope không Active

Không cho dùng

**5**

Tenant bị Suspend

Từ chối

**6**

Lỗi hệ thống

Trả lỗi hệ thống

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Kiểm soát thuộc tính

**2**

Consistency

Scope chuẩn hoá

**3**

Audit

Truy vết thay đổi

**4**

Scalability

Hỗ trợ nhiều Scope

**14\. Ngoài phạm vi (Out of Scope)**

*   Logic ALLOW / DENY Decision
*   Định nghĩa Rule / Condition ABAC
*   RBAC Role / Permission
*   Enforcement tại ứng dụng
*   UI/UX chi tiết

**15\. Ghi chú**

*   AUTHZ‑08 là **nền móng của ABAC**
*   Scope giúp ABAC **có ranh giới, không “free‑form”**
*   Thiết kế Scope sai → **rủi ro bảo mật nghiêm trọng**

### AUTHZ‑09 – ABAC – Attribute Management

_(Quản lý Thuộc tính Phân quyền – ABAC)_

**1\. Mã chức năng**

**AUTHZ‑09**

**2\. Tên chức năng**

**ABAC – Attribute Management**

**3\. Mô tả tổng quát**

Chức năng **ABAC – Attribute Management** cung cấp cơ chế **định nghĩa, quản lý và kiểm soát vòng đời các Attribute** được sử dụng trong mô hình **Attribute‑Based Access Control (ABAC)**.

Attribute:

*   Là **đơn vị dữ liệu nguyên tử** dùng để đánh giá chính sách ABAC
*   Có thể thuộc về:
    *   **Subject** (User, Service, Identity)
    *   **Resource**
    *   **Action**
    *   **Environment**
*   Là **đầu vào bắt buộc** cho:
    *   AUTHZ‑08 – Scope Definition
    *   AUTHZ‑10 – ABAC Rule Evaluation (tương lai)

AUTHZ‑09 đảm bảo rằng **chỉ các Attribute được định nghĩa, kiểm soát và audit** mới được phép tham gia vào Authorization Decision.

**4\. Mục tiêu nghiệp vụ**

*   Chuẩn hoá Attribute dùng trong ABAC
*   Kiểm soát nguồn gốc và phạm vi Attribute
*   Ngăn chặn việc sử dụng Attribute tuỳ tiện / không kiểm soát
*   Đáp ứng yêu cầu audit, compliance và Zero‑Trust

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

System Admin

Quản lý Attribute hệ thống

**2**

Tenant Admin

Quản lý Attribute trong Tenant (nếu cho phép)

**3**

Authorization Engine

Tiêu thụ Attribute khi đánh giá ABAC

**4**

External Attribute Provider

Cung cấp giá trị Attribute

**5**

Auditor (read‑only)

Kiểm toán Attribute

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được xác thực và có quyền quản lý Attribute
*   Tenant tồn tại và ở trạng thái _Active_
*   Tuân thủ **Tenant Isolation (IDM‑04)**
*   Kiến trúc ABAC đã được kích hoạt

**7\. Điều kiện hậu (Post‑conditions)**

*   Attribute được tạo / cập nhật / vô hiệu hoá
*   Attribute có thể được gán vào Scope (AUTHZ‑08)
*   Thay đổi Attribute **không làm gián đoạn session hiện tại**
*   Mọi thay đổi được ghi Audit Log

**8\. Phạm vi chức năng**

**8.1. Định nghĩa Attribute**

Mỗi Attribute bao gồm:

*   Attribute ID
*   Attribute Name (code)
*   Attribute Type:
    *   Subject
    *   Resource
    *   Action
    *   Environment
*   Data Type:
    *   String
    *   Number
    *   Boolean
    *   Enum
    *   Date/Time
*   Source:
    *   Identity Store
    *   Resource Service
    *   Context Provider
    *   External System

**8.2. Quản lý vòng đời Attribute**

*   Trạng thái Attribute:
    *   Active
    *   Inactive
    *   Deprecated
*   Attribute _Inactive / Deprecated_:
    *   Không được dùng cho Scope mới
    *   Không được đánh giá trong ABAC

**8.3. Kiểm soát nguồn Attribute**

*   Attribute phải có **nguồn dữ liệu rõ ràng**
*   Không cho phép Attribute:
    *   Không xác định nguồn
    *   Không đảm bảo độ tin cậy
*   Hỗ trợ Attribute động (runtime‑resolved)

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Attribute ID

Định danh

**2**

Attribute Code

Mã Attribute

**3**

Attribute Type

Subject / Resource / Action / Environment

**4**

Data Type

Kiểu dữ liệu

**5**

Source Type

Nguồn dữ liệu

**6**

Tenant Scope

System / Tenant

**7**

Tenant ID

(nếu Tenant Attribute)

**8**

Attribute Status

Active / Inactive / Deprecated

**9**

Created / Updated By

Actor

**10**

Timestamp

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTHZ‑09‑01

Mọi Attribute **bắt buộc phải được định nghĩa trước**

**2**

BR‑AUTHZ‑09‑02

Attribute phải có **Type và Data Type rõ ràng**

**3**

BR‑AUTHZ‑09‑03

Attribute _Inactive_ → không được dùng cho ABAC

**4**

BR‑AUTHZ‑09‑04

Attribute ngoài Scope → không được đánh giá

**5**

BR‑AUTHZ‑09‑05

Tenant không dùng Attribute của Tenant khác

**6**

BR‑AUTHZ‑09‑06

Attribute hệ thống chỉ sửa bởi System Admin

**7**

BR‑AUTHZ‑09‑07

Thay đổi Attribute không làm logout User

**8**

BR‑AUTHZ‑09‑08

Mọi thay đổi Attribute phải **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

**11.1. Tạo Attribute**

1.  Admin chọn **Create Attribute**
2.  Nhập Attribute Code, Type, Data Type
3.  Khai báo Source
4.  IAM validate dữ liệu & Tenant
5.  Lưu Attribute ở trạng thái _Active_
6.  Ghi Audit Log

**11.2. Cập nhật Attribute**

1.  Admin chỉnh sửa metadata Attribute
2.  IAM kiểm tra ảnh hưởng tới Scope & Rule
3.  Cập nhật Attribute
4.  Ghi Audit Log

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Xử lý**

**1**

Không đủ quyền

Từ chối

**2**

Attribute trùng

Trả lỗi

**3**

Data Type không hợp lệ

Từ chối

**4**

Attribute đang được dùng

Cảnh báo / hạn chế

**5**

Tenant bị Suspend

Từ chối

**6**

Lỗi hệ thống

Trả lỗi hệ thống

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Attribute kiểm soát chặt

**2**

Consistency

Định nghĩa thống nhất

**3**

Audit

Truy vết đầy đủ

**4**

Reliability

Attribute đáng tin cậy

**14\. Ngoài phạm vi (Out of Scope)**

*   Định nghĩa Rule / Condition ABAC
*   Logic ALLOW / DENY Decision
*   RBAC Role / Permission
*   Enforcement tại ứng dụng
*   UI/UX chi tiết

**15\. Ghi chú**

*   AUTHZ‑09 là **nền dữ liệu cốt lõi của ABAC**
*   Attribute là **nguồn gốc của mọi quyết định ABAC**
*   Thiết kế Attribute kém → **ABAC mất kiểm soát**

### AUTHZ‑10 – ABAC – Data Scope Evaluation

_(Đánh giá Phạm vi Dữ liệu theo Thuộc tính – ABAC)_

**1\. Mã chức năng**

**AUTHZ‑10**

**2\. Tên chức năng**

**ABAC – Data Scope Evaluation**

**3\. Mô tả tổng quát**

Chức năng **ABAC – Data Scope Evaluation** chịu trách nhiệm **đánh giá phạm vi dữ liệu (data‑level scope)** mà một Subject (User / Service) **được phép truy cập**, dựa trên **Attribute, Scope và Context** trong mô hình **ABAC**.

Data Scope Evaluation:

*   Không trực tiếp sinh **ALLOW / DENY**
*   Không thay đổi Role / Permission
*   Sinh ra **tập phạm vi dữ liệu hợp lệ (Effective Data Scope)**
*   Là **đầu vào bắt buộc** cho:
    *   Authorization Decision (AUTHZ‑02)
    *   Data Filtering / Query Constraint ở tầng ứng dụng

AUTHZ‑10 cho phép hệ thống thực hiện **fine‑grained authorization (row‑level / object‑level)** theo chuẩn Zero‑Trust.

**4\. Mục tiêu nghiệp vụ**

*   Kiểm soát truy cập **ở mức dữ liệu**, không chỉ API
*   Đảm bảo User chỉ thấy **đúng dữ liệu được phép**
*   Chuẩn hoá cách đánh giá data scope giữa các dịch vụ
*   Hỗ trợ audit, compliance (GDPR, ISO, SOC2)

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Authorization Engine

Gọi Data Scope Evaluation

**2**

Business Service / Data Service

Tiêu thụ Data Scope

**3**

Policy Engine (ABAC)

Cung cấp Rule / Scope

**4**

Auditor (read‑only)

Kiểm toán phạm vi dữ liệu

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Attribute đã được định nghĩa (AUTHZ‑09)
*   Scope đã được định nghĩa (AUTHZ‑08)
*   Authorization Request hợp lệ
*   Context dữ liệu sẵn sàng (Tenant, Resource Type, …)
*   Tuân thủ **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   Sinh ra **Effective Data Scope**
*   Data Scope được gắn với Authorization Context
*   Không thay đổi trạng thái User / Session
*   (Tuỳ cấu hình) Ghi Audit Log

**8\. Phạm vi chức năng**

**8.1. Thu thập Attribute & Context**

*   Subject attributes (department, orgUnit, region, …)
*   Resource attributes (owner, tenantId, classification, …)
*   Environment attributes (time, location, channel, …)

**8.2. Đánh giá Scope & Rule liên quan**

*   Chỉ đánh giá:
    *   Attribute thuộc Scope hợp lệ
    *   Rule áp dụng cho Resource Type
*   Bỏ qua Attribute ngoài Scope

**8.3. Sinh Effective Data Scope**

Effective Data Scope có thể biểu diễn dưới dạng:

*   Logical constraint (ví dụ: org\_id IN (A, B))
*   Filter expression
*   Policy reference ID

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Authorization Request ID

Định danh

**2**

Subject Attributes

Thuộc tính User

**3**

Resource Type

Loại dữ liệu

**4**

Scope ID

Scope áp dụng

**5**

Evaluated Attributes

Attribute đã dùng

**6**

Effective Data Scope

Phạm vi dữ liệu hợp lệ

**7**

Evaluation Time

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTHZ‑10‑01

Data Scope chỉ dùng Attribute **trong Scope hợp lệ**

**2**

BR‑AUTHZ‑10‑02

Không có Scope phù hợp → **Empty Data Scope**

**3**

BR‑AUTHZ‑10‑03

Vi phạm Tenant Isolation → **Empty Data Scope**

**4**

BR‑AUTHZ‑10‑04

Lỗi đánh giá → **Empty Data Scope (fail‑secure)**

**5**

BR‑AUTHZ‑10‑05

Data Scope **không thay thế** ALLOW / DENY

**6**

BR‑AUTHZ‑10‑06

Data Scope có thể dùng cho filtering

**7**

BR‑AUTHZ‑10‑07

Mọi đánh giá có thể **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  AUTHZ‑01 nhận Authorization Request
2.  Gọi AUTHZ‑10 – Data Scope Evaluation
3.  Thu thập Attribute & Context
4.  Xác định Scope áp dụng
5.  Đánh giá Rule liên quan
6.  Sinh **Effective Data Scope**
7.  Trả Data Scope cho Authorization Context
8.  AUTHZ‑02 sử dụng kết quả để ra ALLOW / DENY

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Không có Attribute

Empty Data Scope

**2**

Không có Rule

Empty Data Scope

**3**

Scope Inactive

Empty Data Scope

**4**

Lỗi hệ thống

Empty Data Scope

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Fail‑secure

**2**

Consistency

Scope đánh giá nhất quán

**3**

Performance

Độ trễ thấp

**4**

Audit

Truy vết phạm vi dữ liệu

**14\. Ngoài phạm vi (Out of Scope)**

*   Định nghĩa ABAC Rule chi tiết
*   Thực thi query / filter tại DB
*   ALLOW / DENY Decision
*   UI/UX hiển thị dữ liệu

**15\. Ghi chú**

*   AUTHZ‑10 là **trái tim của data‑level authorization**
*   Không có AUTHZ‑10 → ABAC chỉ dừng ở API‑level
*   Là nền tảng cho **row‑level security / object‑level access**

### AUTHZ‑11 – Tenant Authorization – Tenant Context Validation

_(Xác thực & Kiểm soát Ngữ cảnh Tenant – Multi‑Tenant Security)_

**1\. Mã chức năng**

**AUTHZ‑11**

**2\. Tên chức năng**

**Tenant Authorization – Tenant Context Validation**

**3\. Mô tả tổng quát**

Chức năng **Tenant Context Validation** chịu trách nhiệm **xác thực, kiểm tra và đảm bảo tính hợp lệ tuyệt đối của ngữ cảnh Tenant** cho mọi Authorization Request trong hệ thống **đa Tenant**.

AUTHZ‑11 đảm bảo rằng:

*   Mọi request đều **gắn với đúng Tenant**
*   Không tồn tại truy cập **cross‑tenant**
*   Tenant **hợp lệ, active và được phép xử lý**
*   Là **điều kiện bắt buộc** trước khi:
    *   Đánh giá RBAC
    *   Đánh giá ABAC
    *   Ra quyết định ALLOW / DENY

AUTHZ‑11 là **hard security gate**, áp dụng **fail‑secure tuyệt đối**.

**4\. Mục tiêu nghiệp vụ**

*   Đảm bảo **Tenant Isolation tuyệt đối**
*   Ngăn chặn rủi ro rò rỉ dữ liệu giữa Tenant
*   Chuẩn hoá kiểm tra Tenant cho toàn bộ hệ thống
*   Đáp ứng yêu cầu **Zero‑Trust & Compliance đa Tenant**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Authorization Engine (PDP)

Thực thi Tenant Validation

**2**

Business Service / PEP

Cung cấp Tenant Context

**3**

Tenant

Chủ thể logic (indirect)

**4**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Authorization Request đã được tiếp nhận
*   Identity đã được xác thực (AUTH)
*   Token / Session hợp lệ
*   Tenant Context được gửi kèm request
*   Tuân thủ chuẩn **Tenant Isolation (IDM‑04)**

**7\. Điều kiện hậu (Post‑conditions)**

*   Tenant Context được **xác nhận hợp lệ** hoặc **bị từ chối**
*   Kết quả validation được gắn vào Authorization Context
*   Nếu không hợp lệ → **chấm dứt luồng Authorization**
*   Không thay đổi trạng thái User / Session

**8\. Phạm vi chức năng**

**8.1. Thu thập Tenant Context**

Tenant Context có thể đến từ:

*   Token (tenant\_id claim)
*   Request header
*   Routing context (subdomain, path, …)

**8.2. Kiểm tra Tenant Identity**

*   Tenant ID tồn tại
*   Tenant đúng với Identity / Token
*   Tenant đúng với Resource đang truy cập

**8.3. Kiểm tra trạng thái Tenant**

*   Tenant Status:
    *   Active ✅
    *   Suspended ❌
    *   Deleted ❌
*   Tenant bị _Suspended / Deleted_ → từ chối ngay

**8.4. Kiểm tra Tenant Boundary**

*   Không cho phép:
    *   User Tenant A truy cập Resource Tenant B
    *   Scope / Role / Attribute khác Tenant
*   Áp dụng cho **mọi lớp phía sau**

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Tenant ID

Định danh Tenant

**2**

Tenant Status

Active / Suspended / Deleted

**3**

Request Tenant Context

Tenant từ request

**4**

Identity Tenant Context

Tenant từ token

**5**

Resource Tenant Context

Tenant của Resource

**6**

Validation Result

Valid / Invalid

**7**

Validation Time

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUTHZ‑11‑01

Mọi request **bắt buộc có Tenant Context**

**2**

BR‑AUTHZ‑11‑02

Tenant trong token ≠ Tenant request → **DENY**

**3**

BR‑AUTHZ‑11‑03

Tenant _Suspended / Deleted_ → **DENY**

**4**

BR‑AUTHZ‑11‑04

Cross‑Tenant access → **DENY**

**5**

BR‑AUTHZ‑11‑05

Không validate Tenant → **không đánh giá RBAC/ABAC**

**6**

BR‑AUTHZ‑11‑06

Lỗi validate → **DENY (fail‑secure)**

**7**

BR‑AUTHZ‑11‑07

Kết quả Tenant Validation **không thể override**

**8**

BR‑AUTHZ‑11‑08

Mọi vi phạm Tenant phải **ghi Audit Log**

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  AUTHZ‑01 nhận Authorization Request
2.  Gọi **AUTHZ‑11 – Tenant Context Validation**
3.  Thu thập Tenant Context từ token / request / resource
4.  Kiểm tra Tenant tồn tại & trạng thái
5.  Kiểm tra Tenant Boundary
6.  Nếu hợp lệ → tiếp tục RBAC / ABAC
7.  Nếu không hợp lệ → trả **DENY**

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Thiếu Tenant Context

DENY

**2**

Tenant không tồn tại

DENY

**3**

Tenant bị Suspended

DENY

**4**

Cross‑Tenant Resource

DENY

**5**

Lỗi hệ thống

DENY

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Hard isolation, fail‑secure

**2**

Consistency

Tenant check duy nhất

**3**

Performance

Kiểm tra nhanh

**4**

Audit

Truy vết vi phạm

**14\. Ngoài phạm vi (Out of Scope)**

*   Định nghĩa Tenant lifecycle
*   Quản lý Tenant
*   RBAC / ABAC logic chi tiết
*   Enforcement tại ứng dụng

**15\. Ghi chú**

*   AUTHZ‑11 là **hàng rào bảo mật số 1 của hệ thống đa Tenant**
*   Chạy **trước mọi logic Authorization khác**
*   Thiếu AUTHZ‑11 → **IAM đa Tenant không an toàn**

### AUD‑01 – Authorization Log – ALLOW / DENY Logging

_(Ghi nhật ký Quyết định Cho phép / Từ chối Truy cập)_

**1\. Mã chức năng**

**AUD‑01**

**2\. Tên chức năng**

**Authorization Log – ALLOW / DENY Logging**

**3\. Mô tả tổng quát**

Chức năng **ALLOW / DENY Logging** chịu trách nhiệm **ghi nhận và lưu vết mọi quyết định Authorization** (cho phép hoặc từ chối truy cập) được đưa ra bởi **Policy Decision Point (PDP)** và/hoặc **Policy Enforcement Point (PEP)**.

AUD‑01 đảm bảo rằng **mọi hành vi truy cập tài nguyên đều có thể truy vết**, phục vụ cho:

*   Security monitoring
*   Incident investigation
*   Compliance & audit (ISO 27001, SOC2, PCI‑DSS)
*   Forensic analysis

AUD‑01 **chỉ ghi nhận kết quả Authorization**, **không tham gia vào việc ra quyết định**.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Authentication

❌ Không

**2**

Token / Session

❌ Không

**3**

Authorization (PDP/PEP)

✅ Nguồn quyết định

**4**

**Audit (AUD‑01)**

✅ Ghi nhận quyết định

**4\. Mục tiêu nghiệp vụ**

*   Ghi nhận **đầy đủ, chính xác** các quyết định ALLOW / DENY
*   Hỗ trợ truy vết **ai – làm gì – khi nào – ở đâu – vì sao**
*   Phát hiện hành vi bất thường (DENY bất thường, brute‑force logic)
*   Đáp ứng yêu cầu **Governance & Compliance**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Policy Enforcement Point (PEP)

Gửi log

**2**

Policy Decision Point (PDP)

Cung cấp quyết định

**3**

Audit Logging Service

Lưu trữ log

**4**

SIEM / SOC

Phân tích log

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Authorization flow đã hoàn tất
*   Có quyết định cuối cùng: **ALLOW hoặc DENY**
*   Xác định được Subject, Resource, Action, Tenant

**7\. Điều kiện hậu (Post‑conditions)**

*   Bản ghi Authorization Log được tạo
*   Log được lưu trữ an toàn, bất biến
*   Có thể truy vấn / phân tích theo policy
*   Không ảnh hưởng tới latency của request (async)

**8\. Phạm vi chức năng**

**8.1. Phạm vi log**

AUD‑01 ghi nhận:

*   ✅ ALLOW
*   ✅ DENY (bắt buộc, ưu tiên cao)

Không ghi:

*   Token validation failure
*   Authentication failure (thuộc AUTH/AUD khác)

**8.2. Nội dung log tối thiểu (Minimum Fields)**

**#**

**Nhóm**

**Thuộc tính**

**1**

Decision

ALLOW / DENY

**2**

Subject

sub, subject type

**3**

Tenant

tenant\_id

**4**

Resource

resource ID / URI

**5**

Action

read / write / delete

**6**

Policy

policy ID / version

**7**

Reason

rule matched / deny reason

**8**

Context

IP, device, client

**9**

Time

timestamp

**10**

Trace

request / correlation ID

**8.3. Thời điểm ghi log**

*   Sau khi PDP đưa ra quyết định
*   Trước hoặc sau enforcement (tuỳ kiến trúc)
*   Không retry quyết định

**8.4. Tách mức độ log**

*   **DENY**: luôn log
*   **ALLOW**:
    *   Log đầy đủ, hoặc
    *   Log sampling (tuỳ policy)

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Authorization Log ID

Định danh

**2**

Decision

ALLOW / DENY

**3**

Subject ID

User / Service

**4**

Tenant ID

Tenant

**5**

Resource

Tài nguyên

**6**

Action

Hành động

**7**

Policy ID

Chính sách áp dụng

**8**

Decision Reason

Lý do

**9**

Timestamp

Thời điểm

**10**

Trace ID

Correlation

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUD‑01‑01

Mọi quyết định DENY **bắt buộc log**

**2**

BR‑AUD‑01‑02

ALLOW có thể sampling theo policy

**3**

BR‑AUD‑01‑03

Log gắn Tenant ID

**4**

BR‑AUD‑01‑04

Log **không được sửa/xoá**

**5**

BR‑AUD‑01‑05

Log ghi **không chặn request**

**6**

BR‑AUD‑01‑06

Lỗi log → không ALLOW bypass

**7**

BR‑AUD‑01‑07

Không log dữ liệu nhạy cảm

**8**

BR‑AUD‑01‑08

Hỗ trợ correlation end‑to‑end

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Request đi qua PEP
2.  PDP đánh giá policy
3.  PDP trả về quyết định ALLOW / DENY
4.  PEP thực thi quyết định
5.  PEP / PDP gửi log tới Audit Service
6.  Audit Service lưu log
7.  (Tuỳ chọn) Đẩy log sang SIEM

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Audit Service chậm

Async / buffer

**2**

Log store tạm lỗi

Queue / retry

**3**

Log thất bại

Request **không bị ALLOW bypass**

**4**

Thiếu field

Ghi log tối thiểu

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Integrity, tamper‑proof

**2**

Performance

Async, low‑latency

**3**

Scalability

High‑volume

**4**

Compliance

Retention policy

**5**

Observability

Query / SIEM‑ready

**14\. Ngoài phạm vi (Out of Scope)**

*   Authentication logging
*   Token / Session logging
*   Policy authoring
*   Decision logic
*   UI Audit Console

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Authorization Log ≠ Access Log**
*   **DENY log quan trọng hơn ALLOW**
*   Log phục vụ **audit & forensic**, không phải debug

### AUD‑02 – Authorization Log – Security Monitoring Log

_(Nhật ký Giám sát An ninh cho Authorization)_

**1\. Mã chức năng**

**AUD‑02**

**2\. Tên chức năng**

**Authorization Log – Security Monitoring Log**

**3\. Mô tả tổng quát**

Chức năng **Security Monitoring Log** chịu trách nhiệm **ghi nhận các sự kiện và tín hiệu liên quan đến rủi ro an ninh trong quá trình Authorization**, nhằm phục vụ:

*   Phát hiện hành vi bất thường
*   Cảnh báo sớm tấn công logic / abuse
*   Hỗ trợ SOC / SIEM / UEBA
*   Phân tích xu hướng & threat hunting

AUD‑02 **không log mọi quyết định ALLOW/DENY** (đã thuộc AUD‑01), mà **chỉ log các sự kiện có giá trị an ninh**.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Authentication

❌ Không

**2**

Token / Session

❌ Không

**3**

Authorization (PDP/PEP)

✅ Nguồn sự kiện

**4**

**Audit – AUD‑02**

✅ Security signal logging

**5**

SIEM / SOC

✅ Phân tích & cảnh báo

**4\. Mục tiêu nghiệp vụ**

*   Phát hiện sớm **abnormal authorization behavior**
*   Cung cấp tín hiệu cho **SIEM / SOAR**
*   Hỗ trợ điều tra sự cố & threat modeling
*   Đáp ứng yêu cầu **Continuous Security Monitoring**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Policy Enforcement Point (PEP)

Phát sinh security signal

**2**

Policy Decision Point (PDP)

Đánh giá rủi ro

**3**

Risk / Behavior Engine

Phân loại sự kiện

**4**

Audit Logging Service

Ghi log

**5**

SOC / SIEM

Phân tích & cảnh báo

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Authorization flow đang hoặc đã diễn ra
*   Có **security‑relevant event** được phát hiện
*   Xác định được Subject / Tenant / Context

**7\. Điều kiện hậu (Post‑conditions)**

*   Security Monitoring Log được tạo
*   Log được phân loại theo **severity**
*   Có thể kích hoạt:
    *   Alert
    *   Incident
    *   Automated response (ngoài phạm vi)
*   Không ảnh hưởng quyết định ALLOW/DENY hiện tại

**8\. Phạm vi chức năng**

**8.1. Các loại sự kiện được log (Event Types)**

**#**

**Nhóm**

**Ví dụ**

**1**

Excessive DENY

Nhiều DENY liên tiếp

**2**

Policy Abuse

Truy cập policy edge

**3**

Privilege Escalation Attempt

Thử action cao hơn quyền

**4**

Anomalous Access

Access trái hành vi bình thường

**5**

Cross‑Context Violation

IP / device bất thường

**6**

Rate‑based Violation

High‑frequency authz check

**8.2. Phân loại mức độ (Severity)**

*   LOW – Theo dõi
*   MEDIUM – Phân tích
*   HIGH – Cảnh báo SOC
*   CRITICAL – Incident candidate

**8.3. Nội dung log (Security‑Focused Fields)**

**#**

**Nhóm**

**Thuộc tính**

**1**

Event

event\_type, severity

**2**

Subject

sub, subject type

**3**

Tenant

tenant\_id

**4**

Resource / Action

target

**5**

Context

IP, geo, device

**6**

Pattern

rule / threshold violated

**7**

Timestamp

time

**8**

Trace

correlation ID

**8.4. Thời điểm ghi log**

*   Trong hoặc ngay sau Authorization
*   Khi **ngưỡng / pattern an ninh bị vi phạm**
*   Có thể gom nhóm (aggregation)

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Security Event ID

Định danh

**2**

Event Type

Loại sự kiện

**3**

Severity

Mức độ

**4**

Subject ID

User / Service

**5**

Tenant ID

Tenant

**6**

Context Snapshot

IP / Device

**7**

Detection Rule

Rule ID

**8**

Timestamp

Thời điểm

**9**

Trace ID

Correlation

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUD‑02‑01

Chỉ log sự kiện **security‑relevant**

**2**

BR‑AUD‑02‑02

Gắn severity cho mọi event

**3**

BR‑AUD‑02‑03

Log gắn Tenant ID

**4**

BR‑AUD‑02‑04

Không ghi dữ liệu nhạy cảm

**5**

BR‑AUD‑02‑05

Không ảnh hưởng quyết định authz

**6**

BR‑AUD‑02‑06

Lỗi log → không bypass security

**7**

BR‑AUD‑02‑07

Hỗ trợ aggregation

**8**

BR‑AUD‑02‑08

SIEM‑ready format

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Request đi qua PEP / PDP
2.  PDP/PEP phát hiện pattern bất thường
3.  Security event được tạo
4.  Gán severity & metadata
5.  Gửi event tới Audit Logging Service
6.  Lưu log & forward tới SIEM
7.  (Tuỳ chọn) Kích hoạt alert

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Event lặp lại nhiều

Aggregate

**2**

Log system chậm

Async / buffer

**3**

Thiếu context

Log tối thiểu

**4**

SIEM unavailable

Queue retry

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Integrity, non‑repudiation

**2**

Performance

Async

**3**

Scalability

High‑volume

**4**

Observability

SIEM / SOAR

**5**

Compliance

Retention policy

**14\. Ngoài phạm vi (Out of Scope)**

*   Quyết định ALLOW / DENY (AUD‑01)
*   Authentication monitoring
*   Incident response workflow
*   Automated blocking / revoke
*   UI SOC dashboard

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **AUD‑02 ≠ Access Log**
*   **AUD‑02 ≠ ALLOW/DENY Log**
*   Đây là **security signal**, không phải full audit trail

👉 **Keycloak / OPA mapping**:

*   Event Listener
*   Admin / Authz Events
*   SIEM exporter

### AUD‑03 – Audit Log – Identity Change Log

_(Nhật ký Thay đổi Danh tính – Identity Governance Audit)_

**1\. Mã chức năng**

**AUD‑03**

**2\. Tên chức năng**

**Audit Log – Identity Change Log**

**3\. Mô tả tổng quát**

Chức năng **Identity Change Log** chịu trách nhiệm **ghi nhận đầy đủ và bất biến mọi thay đổi liên quan đến Identity** trong hệ thống IAM, bao gồm:

*   Thuộc tính định danh (profile, credential)
*   Vai trò / nhóm / quyền được gán
*   Trạng thái Identity (active, locked, disabled)
*   Quan hệ Identity ↔ Tenant / Client

AUD‑03 là **audit trail bắt buộc cho Identity Governance**, phục vụ:

*   Truy vết ai đã thay đổi cái gì
*   Điều tra sự cố & gian lận nội bộ
*   Đáp ứng yêu cầu **compliance & regulation**

AUD‑03 **không liên quan đến Authorization decision (AUD‑01)** và **không phải security signal (AUD‑02)**.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Authentication

❌ Không

**2**

Authorization

❌ Không

**3**

Token / Session

❌ Không

**4**

**Identity Management**

✅ Nguồn thay đổi

**5**

**Audit – AUD‑03**

✅ Ghi nhận thay đổi

**6**

Governance / Auditor

✅ Kiểm toán

**4\. Mục tiêu nghiệp vụ**

*   Tạo **immutable audit trail** cho Identity
*   Hỗ trợ **Separation of Duties (SoD)**
*   Phát hiện & điều tra **unauthorized change**
*   Đáp ứng **ISO 27001, SOC2, GDPR, SOX**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Identity Management Service

Phát sinh thay đổi

**2**

Admin / Helpdesk

Thực hiện thay đổi

**3**

Automated Provisioning

Thay đổi tự động

**4**

Audit Logging Service

Lưu log

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Có hành động **tạo / sửa / xoá / gán** Identity
*   Xác định được:
    *   Target Identity
    *   Initiator (user / system)
    *   Tenant
*   Thay đổi đã hoặc sắp được áp dụng

**7\. Điều kiện hậu (Post‑conditions)**

*   Identity Change Log được tạo
*   Log được lưu trữ **bất biến (append‑only)**
*   Có thể truy vấn theo Identity / thời gian / actor
*   Không ảnh hưởng đến kết quả thay đổi (async)

**8\. Phạm vi chức năng**

**8.1. Các loại thay đổi được log (Change Types)**

**#**

**Nhóm**

**Ví dụ**

**1**

Identity Creation

Tạo user / service account

**2**

Attribute Change

Email, name, phone

**3**

Credential Change

Password reset, MFA

**4**

Role / Group Change

Grant / revoke

**5**

Status Change

Enable / disable / lock

**6**

Tenant Assignment

Add / remove tenant

**7**

Client Assignment

Gán application

**8.2. Nội dung log bắt buộc (Minimum Fields)**

**#**

**Nhóm**

**Thuộc tính**

**1**

Target

identity\_id, identity\_type

**2**

Change

change\_type, change\_scope

**3**

Before

old\_value (masked)

**4**

After

new\_value (masked)

**5**

Initiator

actor\_id, actor\_type

**6**

Authority

role / system

**7**

Tenant

tenant\_id

**8**

Reason

reason / ticket

**9**

Time

timestamp

**10**

Trace

correlation ID

**8.3. Thời điểm ghi log**

*   Ghi **ngay khi thay đổi được thực hiện**
*   Hoặc **trước & sau** (pre/post state)
*   Không ghi log cho thao tác read‑only

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Audit Log ID

Định danh

**2**

Identity ID

Đối tượng bị thay đổi

**3**

Change Type

Loại thay đổi

**4**

Old Value

Giá trị cũ (masked)

**5**

New Value

Giá trị mới (masked)

**6**

Initiator

Người / hệ thống

**7**

Tenant ID

Tenant

**8**

Reason

Lý do

**9**

Timestamp

Thời điểm

**10**

Trace ID

Correlation

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUD‑03‑01

Mọi thay đổi Identity **bắt buộc log**

**2**

BR‑AUD‑03‑02

Log **append‑only, không sửa/xoá**

**3**

BR‑AUD‑03‑03

Log gắn Tenant ID

**4**

BR‑AUD‑03‑04

Dữ liệu nhạy cảm phải **mask / hash**

**5**

BR‑AUD‑03‑05

Initiator bắt buộc xác định

**6**

BR‑AUD‑03‑06

Lỗi log → không bypass governance

**7**

BR‑AUD‑03‑07

Hỗ trợ SoD review

**8**

BR‑AUD‑03‑08

Retention theo compliance

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Admin / System thực hiện thay đổi Identity
2.  Identity Service xác nhận thay đổi hợp lệ
3.  Tạo snapshot trước & sau (masked)
4.  Gửi sự kiện tới Audit Logging Service
5.  Audit Service lưu log bất biến
6.  (Tuỳ chọn) Forward sang SIEM / GRC

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Thay đổi tự động

actor\_type = system

**2**

Thiếu reason

Cho phép nhưng flag

**3**

Log service chậm

Async / queue

**4**

Log thất bại

Thay đổi không được auto‑rollback

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Integrity, non‑repudiation

**2**

Compliance

Retention, immutability

**3**

Performance

Async

**4**

Scalability

High‑volume changes

**5**

Auditability

Easy trace & export

**14\. Ngoài phạm vi (Out of Scope)**

*   Authorization decision log (AUD‑01)
*   Security anomaly log (AUD‑02)
*   Authentication attempt log
*   Incident response workflow
*   UI Identity history viewer

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Identity Change Log ≠ Access Log**
*   Đây là **Governance Audit**, không phải security signal
*   Là nền tảng cho **IGA / SoD / Compliance**

👉 **Keycloak mapping**:

*   Admin Events
*   User / Role / Group change events
*   Event Listener → SIEM

### AUD‑04 – Audit Log – Role / Scope Change Log

_(Nhật ký Thay đổi Role / Scope – Authorization Governance Audit)_

**1\. Mã chức năng**

**AUD‑04**

**2\. Tên chức năng**

**Audit Log – Role / Scope Change Log**

**3\. Mô tả tổng quát**

Chức năng **Role / Scope Change Log** chịu trách nhiệm **ghi nhận đầy đủ, bất biến mọi thay đổi liên quan đến Role, Scope và quan hệ phân quyền**, bao gồm:

*   Tạo / sửa / xoá Role
*   Tạo / sửa / xoá Scope
*   Gán / thu hồi Role cho Identity
*   Gán / thu hồi Scope cho Client / Token model
*   Thay đổi quan hệ Role ↔ Scope

AUD‑04 cung cấp **audit trail cho Authorization Governance**, phục vụ:

*   Truy vết thay đổi quyền truy cập
*   Phân tích nguyên nhân sự cố phân quyền
*   SoD review & access certification
*   Tuân thủ **ISO 27001, SOC2, SOX**

AUD‑04 **không ghi nhận quyết định ALLOW/DENY (AUD‑01)** và **không ghi nhận thay đổi profile/credential (AUD‑03)**.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Authentication

❌ Không

**2**

Session / Token

❌ Không

**3**

**Authorization Model (RBAC / Scope)**

✅ Nguồn thay đổi

**4**

**Audit – AUD‑04**

✅ Ghi nhận

**5**

GRC / Auditor

✅ Kiểm toán

**4\. Mục tiêu nghiệp vụ**

*   Tạo **immutable audit trail** cho mọi thay đổi quyền
*   Hỗ trợ **Access Governance & Certification**
*   Đảm bảo **Separation of Duties (SoD)**
*   Phục vụ điều tra **privilege escalation**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Authorization Admin

Thay đổi Role / Scope

**2**

IAM Governance Service

Thực thi

**3**

Automated Provisioning

Thay đổi tự động

**4**

Audit Logging Service

Lưu log

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Có hành động **thay đổi Role / Scope**
*   Xác định được:
    *   Target object
    *   Initiator (user / system)
    *   Tenant
*   Thay đổi đã hoặc sắp được áp dụng

**7\. Điều kiện hậu (Post‑conditions)**

*   Role / Scope Change Log được tạo
*   Log được lưu **append‑only**
*   Có thể truy vấn theo Role / Identity / thời gian
*   Không ảnh hưởng đến enforcement runtime

**8\. Phạm vi chức năng**

**8.1. Các loại thay đổi được log (Change Types)**

**#**

**Nhóm**

**Ví dụ**

**1**

Role Definition

Create / Update / Delete role

**2**

Scope Definition

Create / Update / Delete scope

**3**

Role Assignment

Grant / Revoke role

**4**

Scope Assignment

Grant / Revoke scope

**5**

Role–Scope Mapping

Add / Remove scope from role

**6**

Client Scope Change

Default / Optional scopes

**8.2. Nội dung log bắt buộc (Minimum Fields)**

**#**

**Nhóm**

**Thuộc tính**

**1**

Target

role\_id / scope\_id

**2**

Change

change\_type

**3**

Relationship

subject / client

**4**

Before

old\_value (masked)

**5**

After

new\_value (masked)

**6**

Initiator

actor\_id / type

**7**

Authority

role / system

**8**

Tenant

tenant\_id

**9**

Reason

ticket / justification

**10**

Time

timestamp

**11**

Trace

correlation ID

**8.3. Thời điểm ghi log**

*   Ghi **ngay khi thay đổi được thực hiện**
*   Hoặc **pre/post state** (nếu cần)
*   Không ghi cho thao tác read‑only

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Audit Log ID

Định danh

**2**

Role / Scope ID

Đối tượng

**3**

Change Type

Loại thay đổi

**4**

Old Value

Trước

**5**

New Value

Sau

**6**

Initiator

Người / hệ thống

**7**

Tenant ID

Tenant

**8**

Reason

Lý do

**9**

Timestamp

Thời điểm

**10**

Trace ID

Correlation

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUD‑04‑01

Mọi thay đổi Role / Scope **bắt buộc log**

**2**

BR‑AUD‑04‑02

Log **append‑only**

**3**

BR‑AUD‑04‑03

Gắn Tenant ID

**4**

BR‑AUD‑04‑04

Không log secret / token

**5**

BR‑AUD‑04‑05

Initiator bắt buộc xác định

**6**

BR‑AUD‑04‑06

Lỗi log → không bypass governance

**7**

BR‑AUD‑04‑07

Hỗ trợ SoD review

**8**

BR‑AUD‑04‑08

Retention theo compliance

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Admin / System thực hiện thay đổi Role / Scope
2.  Authorization Model validate thay đổi
3.  Tạo snapshot trước & sau
4.  Gửi sự kiện tới Audit Logging Service
5.  Audit Service lưu log bất biến
6.  (Tuỳ chọn) Forward sang GRC / SIEM

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Provisioning tự động

actor\_type = system

**2**

Thiếu reason

Cho phép nhưng flag

**3**

Log service chậm

Async / queue

**4**

Log thất bại

Thay đổi không auto‑rollback

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Integrity, non‑repudiation

**2**

Compliance

Retention, immutability

**3**

Performance

Async

**4**

Scalability

Nhiều thay đổi

**5**

Auditability

Dễ truy vấn / export

**14\. Ngoài phạm vi (Out of Scope)**

*   Authorization decision log (AUD‑01)
*   Security monitoring log (AUD‑02)
*   Identity attribute change (AUD‑03)
*   Token issuance / validation
*   Runtime enforcement logic

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Role / Scope Change Log ≠ Authorization Decision**
*   Đây là **Access Governance Audit**, không phải runtime log
*   Là nền tảng cho **Access Review / Certification**

👉 **Keycloak mapping**:

*   Admin Events (Roles, Client Scopes)
*   Role / Scope assignment events
*   Event Listener → SIEM / GRC

### AUD‑05 – Audit Log – Tenant Configuration Log

_(Nhật ký Thay đổi Cấu hình Tenant – Tenant Governance Audit)_

**1\. Mã chức năng**

**AUD‑05**

**2\. Tên chức năng**

**Audit Log – Tenant Configuration Log**

**3\. Mô tả tổng quát**

Chức năng **Tenant Configuration Log** chịu trách nhiệm **ghi nhận đầy đủ, bất biến mọi thay đổi cấu hình ở cấp Tenant** trong hệ thống IAM, bao gồm:

*   Cấu hình bảo mật Tenant
*   Chính sách Authentication / Authorization / Session
*   Cấu hình Token, Session timeout
*   Feature flag & integration (IdP, MFA, SSO)
*   Trạng thái hoạt động của Tenant

AUD‑05 là **audit trail nền tảng cho Multi‑Tenant Governance**, phục vụ:

*   Truy vết thay đổi ảnh hưởng toàn Tenant
*   Điều tra sự cố cấu hình (misconfiguration)
*   Tuân thủ **ISO 27001, SOC2, SOX, PCI‑DSS**

AUD‑05 **không ghi nhận runtime decision (AUD‑01)** và **không ghi nhận thay đổi Identity/Role riêng lẻ (AUD‑03, AUD‑04)**.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Authentication / Authorization Runtime

❌ Không

**2**

Identity / Role Management

❌ Không

**3**

**Tenant Management**

✅ Nguồn thay đổi

**4**

**Audit – AUD‑05**

✅ Ghi nhận

**5**

Governance / Auditor

✅ Kiểm toán

**4\. Mục tiêu nghiệp vụ**

*   Tạo **immutable audit trail** cho cấu hình Tenant
*   Phát hiện & điều tra **misconfiguration**
*   Hỗ trợ **Tenant‑level Risk & Compliance**
*   Đảm bảo **Separation of Duties (SoD)** giữa Tenant Admin

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Tenant Admin

Thay đổi cấu hình

**2**

System / Platform Admin

Thay đổi cấp hệ thống

**3**

Automated Configuration

Áp dụng policy

**4**

Audit Logging Service

Lưu log

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Có hành động **thay đổi cấu hình Tenant**
*   Xác định được:
    *   Tenant ID
    *   Initiator (user / system)
*   Thay đổi đã hoặc sắp được áp dụng

**7\. Điều kiện hậu (Post‑conditions)**

*   Tenant Configuration Log được tạo
*   Log được lưu **append‑only, bất biến**
*   Có thể truy vấn theo Tenant / thời gian / initiator
*   Không ảnh hưởng đến hiệu lực cấu hình runtime

**8\. Phạm vi chức năng**

**8.1. Các loại cấu hình được log (Configuration Types)**

**#**

**Nhóm**

**Ví dụ**

**1**

Tenant Metadata

Name, status, region

**2**

Auth Policy

Password, MFA, IdP

**3**

Session Policy

Idle / Absolute timeout

**4**

Token Policy

TTL, refresh policy

**5**

Authorization Policy

Default deny/allow

**6**

Feature Flag

Enable / disable feature

**7**

Integration

External IdP, LDAP

**8**

Security Setting

IP allowlist, risk mode

**8.2. Nội dung log bắt buộc (Minimum Fields)**

**#**

**Nhóm**

**Thuộc tính**

**1**

Tenant

tenant\_id

**2**

Change

config\_type, change\_type

**3**

Target

config\_key

**4**

Before

old\_value (masked)

**5**

After

new\_value (masked)

**6**

Initiator

actor\_id, actor\_type

**7**

Authority

tenant\_admin / system

**8**

Reason

ticket / justification

**9**

Time

timestamp

**10**

Trace

correlation ID

**8.3. Thời điểm ghi log**

*   Ghi **ngay khi cấu hình được thay đổi**
*   Có thể ghi **pre/post state**
*   Không ghi cho thao tác read‑only

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Audit Log ID

Định danh

**2**

Tenant ID

Tenant bị ảnh hưởng

**3**

Config Type

Loại cấu hình

**4**

Config Key

Trường cấu hình

**5**

Old Value

Giá trị cũ (masked)

**6**

New Value

Giá trị mới (masked)

**7**

Initiator

Người / hệ thống

**8**

Reason

Lý do

**9**

Timestamp

Thời điểm

**10**

Trace ID

Correlation

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUD‑05‑01

Mọi thay đổi Tenant config **bắt buộc log**

**2**

BR‑AUD‑05‑02

Log **append‑only, không sửa/xoá**

**3**

BR‑AUD‑05‑03

Bắt buộc gắn Tenant ID

**4**

BR‑AUD‑05‑04

Giá trị nhạy cảm phải mask / hash

**5**

BR‑AUD‑05‑05

Initiator bắt buộc xác định

**6**

BR‑AUD‑05‑06

Lỗi log → không bypass governance

**7**

BR‑AUD‑05‑07

Hỗ trợ SoD & approval review

**8**

BR‑AUD‑05‑08

Retention theo compliance

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Tenant Admin / System thay đổi cấu hình
2.  Tenant Management validate thay đổi
3.  Tạo snapshot trước & sau
4.  Gửi sự kiện tới Audit Logging Service
5.  Audit Service lưu log bất biến
6.  (Tuỳ chọn) Forward sang SIEM / GRC

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Thay đổi tự động

actor\_type = system

**2**

Thiếu reason

Cho phép nhưng flag

**3**

Log service chậm

Async / queue

**4**

Log thất bại

Không auto‑rollback

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Integrity, non‑repudiation

**2**

Compliance

Retention, immutability

**3**

Performance

Async

**4**

Scalability

Nhiều Tenant

**5**

Auditability

Dễ truy vấn / export

**14\. Ngoài phạm vi (Out of Scope)**

*   Authorization decision log (AUD‑01)
*   Security monitoring log (AUD‑02)
*   Identity change log (AUD‑03)
*   Role / Scope change log (AUD‑04)
*   Runtime enforcement logic

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Tenant Configuration Log ≠ System Config Log**
*   Đây là **Tenant‑level Governance Audit**
*   Sai cấu hình Tenant là **nguyên nhân phổ biến của security incident**

👉 **Keycloak mapping**:

*   Realm configuration changes
*   Realm security settings
*   Admin Events → SIEM / GRC

### AUD‑06 – Log Governance – Immutable Log

_(Quản trị Nhật ký Bất biến – Audit Log Immutability)_

**1\. Mã chức năng**

**AUD‑06**

**2\. Tên chức năng**

**Log Governance – Immutable Log**

**3\. Mô tả tổng quát**

Chức năng **Immutable Log** đảm bảo rằng **mọi Audit Log trong hệ thống IAM là bất biến (immutable), không thể chỉnh sửa hoặc xoá**, kể cả bởi **System Admin**, nhằm:

*   Ngăn chặn **log tampering / cover‑up**
*   Đảm bảo **tính toàn vẹn (integrity) & không chối bỏ (non‑repudiation)**
*   Đáp ứng yêu cầu **compliance nghiêm ngặt** (ISO 27001, SOC2, SOX, PCI‑DSS)

AUD‑06 **không tạo log mới**, mà **áp dụng cơ chế governance** cho **toàn bộ các loại Audit Log**:

*   AUD‑01 → AUD‑05

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Audit Event Producer

Gửi log

**2**

Audit Logging Service

Lưu log

**3**

**Log Governance – AUD‑06**

✅ Bảo vệ tính bất biến

**4**

Storage / WORM / Ledger

✅ Thực thi

**5**

Auditor / Regulator

✅ Kiểm tra

**4\. Mục tiêu nghiệp vụ**

*   Đảm bảo **Audit Log không thể bị sửa/xoá**
*   Phát hiện và ngăn chặn **insider threat**
*   Tạo **single source of truth** cho điều tra
*   Đáp ứng yêu cầu **Legal Hold & Regulatory Audit**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Audit Logging Service

Ghi log

**2**

Log Governance Engine

Áp chính sách bất biến

**3**

Storage System (WORM / Ledger)

Lưu trữ

**4**

Platform Admin

Quản trị (không sửa log)

**5**

Auditor / Regulator

Kiểm tra

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Audit Log được tạo (AUD‑01 → AUD‑05)
*   Log Governance Policy đã được cấu hình
*   Storage hỗ trợ **append‑only / immutability**

**7\. Điều kiện hậu (Post‑conditions)**

*   Log được lưu **append‑only**
*   Không thể:
    *   Update
    *   Delete
    *   Truncate
*   Mọi hành vi vi phạm → **Security Event**
*   Có thể verify tính toàn vẹn log

**8\. Phạm vi chức năng**

**8.1. Cơ chế bất biến (Immutability Mechanisms)**

Hệ thống phải hỗ trợ ≥1 cơ chế:

*   WORM storage (Write Once Read Many)
*   Append‑only database
*   Hash‑chain / Merkle Tree
*   External immutable ledger (tuỳ chọn)

**8.2. Hash & Integrity Verification**

*   Mỗi log record có:
    *   Hash riêng
    *   Liên kết với record trước (chain)
*   Hỗ trợ:
    *   Integrity check
    *   Tamper detection

**8.3. Quyền truy cập log**

*   ✅ Read‑only cho Auditor
*   ❌ Không ai có quyền sửa/xoá
*   Admin chỉ:
    *   Cấu hình retention
    *   Cấu hình export

**8.4. Retention & Legal Hold**

*   Retention theo:
    *   Policy
    *   Regulation
*   Legal Hold:
    *   Tạm dừng purge
    *   Không ghi đè

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Audit Log ID

Định danh

**2**

Hash

Hash của record

**3**

Previous Hash

Hash record trước

**4**

Storage Type

WORM / Ledger

**5**

Retention Policy

Thời gian lưu

**6**

Legal Hold Flag

Yes / No

**7**

Timestamp

Thời điểm

**8**

Verification Status

Valid / Tampered

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUD‑06‑01

Audit Log **không được sửa/xoá**

**2**

BR‑AUD‑06‑02

Log phải append‑only

**3**

BR‑AUD‑06‑03

Bắt buộc integrity verification

**4**

BR‑AUD‑06‑04

Admin **không có quyền bypass**

**5**

BR‑AUD‑06‑05

Vi phạm → Security Event

**6**

BR‑AUD‑06‑06

Retention theo policy

**7**

BR‑AUD‑06‑07

Legal Hold override purge

**8**

BR‑AUD‑06‑08

Fail → fail‑secure

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Audit Log được tạo (AUD‑01 → AUD‑05)
2.  Log Governance Engine áp policy
3.  Log được ghi vào immutable storage
4.  Tạo hash & chain
5.  Trả xác nhận ghi thành công
6.  Log sẵn sàng cho audit

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Storage immutable unavailable

DENY write

**2**

Hash mismatch

Flag tampering

**3**

Retention hết hạn

Chỉ purge nếu không Legal Hold

**4**

Attempt delete/update

Security alert

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Integrity, non‑repudiation

**2**

Compliance

WORM, retention

**3**

Reliability

No data loss

**4**

Performance

Append‑only, async

**5**

Auditability

Verifiable

**14\. Ngoài phạm vi (Out of Scope)**

*   Tạo Audit Event (AUD‑01 → 05)
*   SIEM correlation logic
*   Log analytics
*   UI log viewer
*   Incident response workflow

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Immutable Log = nền móng của toàn bộ Audit**
*   Không có immutable log → **Audit không có giá trị pháp lý**
*   Bắt buộc cho:
    *   Zero‑Trust
    *   Compliance‑driven IAM
    *   Regulated industries

👉 **Keycloak / Enterprise mapping**:

*   Event Listener + External WORM storage
*   SIEM + Immutable backend (S3 Object Lock, Ledger DB)

### AUD‑07 – Log Governance – Long‑term Retention

_(Quản trị Lưu trữ Nhật ký Dài hạn – Audit Log Retention)_

**1\. Mã chức năng**

**AUD‑07**

**2\. Tên chức năng**

**Log Governance – Long‑term Retention**

**3\. Mô tả tổng quát**

Chức năng **Long‑term Retention** chịu trách nhiệm **quản lý thời gian lưu trữ dài hạn của toàn bộ Audit Log** trong hệ thống IAM, đảm bảo rằng:

*   Audit Log được lưu giữ **đúng thời hạn theo quy định**
*   Không bị xoá sớm hoặc giữ quá mức cần thiết
*   Phù hợp yêu cầu **compliance, pháp lý và điều tra hậu sự cố**

AUD‑07 **không tạo log**, **không sửa log**, mà **định nghĩa – thực thi – giám sát chính sách lưu trữ** cho các Audit Log đã được bảo vệ bởi **AUD‑06 (Immutable Log)**.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Audit Event (AUD‑01 → 05)

Nguồn log

**2**

Immutable Log (AUD‑06)

Bất biến

**3**

**Log Governance – AUD‑07**

✅ Retention policy

**4**

Storage Tier (Hot/Warm/Cold/Archive)

✅ Lưu trữ

**5**

Compliance / Legal

✅ Kiểm soát

**4\. Mục tiêu nghiệp vụ**

*   Đáp ứng yêu cầu **Retention theo luật & chuẩn**
*   Giảm rủi ro pháp lý do **xoá log sớm**
*   Tối ưu chi phí lưu trữ dài hạn
*   Hỗ trợ **forensic & regulatory audit**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Log Governance Engine

Thực thi retention

**2**

Storage System

Lưu trữ nhiều tier

**3**

Compliance Officer

Định nghĩa policy

**4**

Platform Admin

Cấu hình (không xoá log)

**5**

Auditor / Regulator

Kiểm tra

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Audit Log đã được ghi và bất biến (AUD‑06)
*   Retention Policy đã được cấu hình
*   Storage hỗ trợ multi‑tier & lifecycle policy

**7\. Điều kiện hậu (Post‑conditions)**

*   Log được lưu **đủ thời gian yêu cầu**
*   Log hết hạn:
    *   Được purge **đúng chính sách**
    *   Hoặc giữ lại nếu **Legal Hold**
*   Có thể chứng minh:
    *   Log tồn tại đúng thời gian
    *   Không bị xoá trái phép

**8\. Phạm vi chức năng**

**8.1. Chính sách Retention theo loại Log**

Retention có thể khác nhau theo:

*   Audit Log Type (AUD‑01 → AUD‑05)
*   Tenant
*   Mức độ rủi ro
*   Quy định pháp lý

**Ví dụ**

*   Authorization log: 1–3 năm
*   Identity / Role / Tenant change: 5–7 năm
*   Regulated tenant: ≥10 năm

**8.2. Multi‑Tier Storage Lifecycle**

Hệ thống hỗ trợ:

*   **Hot**: truy vấn nhanh (ngắn hạn)
*   **Warm**: truy vấn hạn chế
*   **Cold / Archive**: lưu trữ dài hạn, chi phí thấp

Việc chuyển tier **không làm mất tính bất biến**.

**8.3. Legal Hold**

*   Khi Legal Hold được kích hoạt:
    *   Dừng purge
    *   Giữ log **vô thời hạn** cho tới khi gỡ hold
*   Legal Hold **override retention policy**

**8.4. Purge có kiểm soát**

*   Chỉ purge khi:
    *   Hết retention
    *   Không Legal Hold
*   Purge phải:
    *   Có audit record
    *   Có approval (tuỳ policy)

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Audit Log ID

Định danh

**2**

Log Type

AUD‑01 … AUD‑05

**3**

Retention Policy ID

Chính sách

**4**

Retention Period

Thời gian

**5**

Storage Tier

Hot/Warm/Cold

**6**

Legal Hold Flag

Yes / No

**7**

Purge Eligibility

Eligible / Blocked

**8**

Timestamp

Thời điểm

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUD‑07‑01

Mọi Audit Log **bắt buộc có retention**

**2**

BR‑AUD‑07‑02

Không purge trước hạn

**3**

BR‑AUD‑07‑03

Legal Hold override mọi policy

**4**

BR‑AUD‑07‑04

Purge phải audit

**5**

BR‑AUD‑07‑05

Admin không purge tuỳ ý

**6**

BR‑AUD‑07‑06

Retention theo compliance

**7**

BR‑AUD‑07‑07

Fail xử lý → giữ log

**8**

BR‑AUD‑07‑08

Retention ≠ Immutability

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Audit Log được ghi (AUD‑01 → AUD‑05)
2.  Log được bảo vệ bất biến (AUD‑06)
3.  Log Governance Engine gán retention policy
4.  Log được lưu theo storage tier
5.  Định kỳ đánh giá hết hạn
6.  Nếu eligible & không Legal Hold → purge có kiểm soát
7.  Ghi audit cho hành vi purge

12\. Luồng thay thế / ngoại lệ

**#**

**Trường hợp**

**Kết quả**

**1**

Legal Hold active

Không purge

**2**

Storage archive unavailable

Retry / giữ

**3**

Policy thay đổi

Áp dụng cho log mới

**4**

Lỗi purge

Giữ log

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Compliance

ISO, SOC2, SOX, GDPR

**2**

Security

Non‑repudiation

**3**

Reliability

No premature deletion

**4**

Cost

Tiered storage

**5**

Auditability

Chứng minh retention

**14\. Ngoài phạm vi (Out of Scope)**

*   Tạo Audit Event
*   SIEM analytics
*   Incident response
*   UI log viewer
*   Storage vendor specifics

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Immutability (AUD‑06) ≠ Retention (AUD‑07)**
*   Immutability bảo vệ log
*   Retention quyết định **giữ bao lâu**
*   Purge hợp lệ **không vi phạm audit**, nếu đúng policy

👉 **Enterprise mapping**:

*   S3 Object Lock + Lifecycle
*   Archive Storage / Glacier
*   Ledger DB + Retention rule

### AUD‑08 – Log Governance – Correlation Tracking

_(Quản trị Liên kết & Truy vết Nhật ký End‑to‑End)_

**1\. Mã chức năng**

**AUD‑08**

**2\. Tên chức năng**

**Log Governance – Correlation Tracking**

**3\. Mô tả tổng quát**

Chức năng **Correlation Tracking** đảm bảo rằng **mọi Audit Log trong hệ thống IAM có thể được liên kết (correlate) với nhau theo một chuỗi nghiệp vụ thống nhất**, từ:

**Tenant → Identity → Role/Scope → Session → Token → Authorization → Audit Governance**

AUD‑08 cho phép:

*   Truy vết **end‑to‑end một hành vi**
*   Phân tích nguyên nhân gốc (root cause)
*   Điều tra sự cố & forensic
*   Đáp ứng audit & regulatory review

AUD‑08 **không tạo log mới**, mà **chuẩn hoá và cưỡng chế việc gắn Correlation Identifier** cho toàn bộ Audit Log.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Audit Producers (AUD‑01 → 05)

Gửi log

**2**

Immutable / Retention (AUD‑06 / 07)

Bảo vệ

**3**

**Log Governance – AUD‑08**

✅ Correlation

**4**

SIEM / SOC / GRC

✅ Phân tích

**4\. Mục tiêu nghiệp vụ**

*   Cho phép **truy vết xuyên suốt (end‑to‑end traceability)**
*   Liên kết nhiều log rời rạc thành **một chuỗi sự kiện**
*   Hỗ trợ:
    *   Incident investigation
    *   Threat hunting
    *   Compliance audit
*   Giảm thời gian **MTTR / MTTC**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Audit Event Producer

Gắn correlation

**2**

Correlation Engine

Chuẩn hoá & validate

**3**

Audit Logging Service

Lưu log

**4**

SIEM / SOC

Phân tích

**5**

Auditor / Investigator

Truy vết

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Audit Event được tạo (AUD‑01 → AUD‑05)
*   Correlation Policy đã được cấu hình
*   Hệ thống hỗ trợ propagation metadata

**7\. Điều kiện hậu (Post‑conditions)**

*   Mỗi Audit Log có:
    *   Correlation ID hợp lệ
    *   Parent / Root reference (nếu có)
*   Các log liên quan có thể truy vấn theo chuỗi
*   Không ảnh hưởng runtime decision

**8\. Phạm vi chức năng**

**8.1. Correlation Identifiers (BẮT BUỘC)**

**#**

**ID**

**Mô tả**

**1**

**Trace ID**

Chuỗi nghiệp vụ tổng

**2**

**Request ID**

Một request cụ thể

**3**

**Session ID**

Session liên quan

**4**

**Token ID (optional)**

Token liên quan

**5**

**Subject ID**

Identity

**6**

**Tenant ID**

Tenant

👉 Tối thiểu: **Trace ID + Tenant ID**

**8.2. Mô hình Correlation (End‑to‑End)**

Tenant

└─ Identity Change (AUD‑03)

└─ Role/Scope Change (AUD‑04)

└─ Session (SES)

└─ Token (TOK)

└─ Authorization (AUD‑01)

└─ Security Event (AUD‑02)

Tất cả liên kết bằng **Trace ID / Correlation ID**.

**8.3. Propagation Rules**

*   Correlation ID:
    *   Sinh ở entry point (Gateway / Auth)
    *   Propagate xuyên suốt các service
*   Không được regenerate giữa chừng
*   Service trung gian **phải forward**

**8.4. Cross‑System Correlation**

*   Hỗ trợ:
    *   Distributed tracing
    *   Cross‑service IAM
    *   External SIEM
*   Mapping với:
    *   traceparent
    *   correlation-id
    *   Vendor‑neutral format

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Correlation ID

Định danh chuỗi

**2**

Trace ID

Root trace

**3**

Parent ID

Log cha

**4**

Entity References

tenant / subject / session

**5**

Event Type

AUD‑xx

**6**

Timestamp

Thời điểm

**7**

Integrity Hash

Liên kết AUD‑06

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑AUD‑08‑01

Mọi Audit Log **bắt buộc có Correlation ID**

**2**

BR‑AUD‑08‑02

Correlation ID **không được sửa**

**3**

BR‑AUD‑08‑03

Propagate xuyên suốt

**4**

BR‑AUD‑08‑04

Thiếu Correlation → reject / flag

**5**

BR‑AUD‑08‑05

Tenant ID bắt buộc

**6**

BR‑AUD‑08‑06

Không log PII trong correlation

**7**

BR‑AUD‑08‑07

Hỗ trợ cross‑system

**8**

BR‑AUD‑08‑08

Fail → fail‑secure

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Entry point tạo **Trace / Correlation ID**
2.  ID được gắn vào request context
3.  Các service IAM xử lý và phát sinh Audit Log
4.  Audit Log mang cùng Correlation ID
5.  Log được lưu immutable (AUD‑06)
6.  SIEM truy vấn theo Correlation ID

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Thiếu Correlation ID

Reject / flag log

**2**

Cross‑service fail

Preserve root ID

**3**

External system

Map ID

**4**

Log async

Correlation preserved

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Observability

End‑to‑end trace

**2**

Security

Integrity preserved

**3**

Scalability

High‑volume

**4**

Compatibility

SIEM / OpenTelemetry

**5**

Auditability

Forensic‑ready

**14\. Ngoài phạm vi (Out of Scope)**

*   Log content definition (AUD‑01 → 05)
*   SIEM analytics rules
*   Incident response workflow
*   UI visualization
*   Vendor‑specific tracing tools

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Không có Correlation → Audit không điều tra được**
*   AUD‑08 là **xương sống của forensic**
*   Bắt buộc cho:
    *   Zero‑Trust
    *   Regulated IAM
    *   Distributed IAM architecture

👉 **Enterprise / Keycloak mapping**:

*   Event correlation via request ID
*   Admin / Auth events + trace ID
*   SIEM distributed tracing

### ADM‑01 – IAM Configuration – Policy Configuration

_(Quản trị Cấu hình Chính sách IAM)_

**1\. Mã chức năng**

**ADM‑01**

**2\. Tên chức năng**

**IAM Configuration – Policy Configuration**

**3\. Mô tả tổng quát**

Chức năng **Policy Configuration** cho phép **định nghĩa, chỉnh sửa, quản lý vòng đời các chính sách IAM** trong hệ thống, bao gồm:

*   Authorization Policy (RBAC / ABAC / Scope)
*   Authentication Policy (MFA, password, IdP)
*   Session Policy (timeout, concurrency)
*   Token Policy (TTL, refresh)
*   Audit / Security Policy (logging, monitoring)

ADM‑01 thuộc **Administration Plane**, **không tham gia runtime decision**, và **không tự động thay đổi trạng thái truy cập đang diễn ra**.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Authentication / Authorization Runtime

❌ Không

**2**

Session / Token Runtime

❌ Không

**3**

**Administration Plane (ADM‑01)**

✅ Quản trị policy

**4**

Audit (AUD‑03/04/05)

✅ Ghi nhận thay đổi

**5**

Governance / GRC

✅ Kiểm soát

**4\. Mục tiêu nghiệp vụ**

*   Quản trị **chính sách IAM tập trung**
*   Đảm bảo **Consistency – Predictability**
*   Hỗ trợ **Separation of Duties (SoD)**
*   Đáp ứng **Governance / Compliance**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

IAM Admin

Cấu hình policy

**2**

Security Admin

Cấu hình policy bảo mật

**3**

Platform Admin

Cấu hình nền tảng

**4**

Policy Engine

Validate policy

**5**

Auditor (read‑only)

Kiểm tra

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã được authenticate & authorize
*   Có quyền quản trị policy
*   Tenant context được xác định

**7\. Điều kiện hậu (Post‑conditions)**

*   Policy được:
    *   Tạo mới / cập nhật / vô hiệu hoá
*   Policy được versioning
*   Thay đổi được audit (AUD‑04 / AUD‑05)
*   Runtime engine **không bị restart**

**8\. Phạm vi chức năng**

**8.1. Các loại Policy được cấu hình**

**#**

**Nhóm**

**Ví dụ**

**1**

Authorization Policy

RBAC, ABAC, Scope

**2**

Authentication Policy

MFA, password rule

**3**

Session Policy

Idle / Absolute timeout

**4**

Token Policy

TTL, refresh rotation

**5**

Audit Policy

Log level, retention

**6**

Security Policy

IP allowlist, risk mode

**8.2. Quản lý vòng đời Policy (Policy Lifecycle)**

*   Create
*   Update
*   Version
*   Activate / Deactivate
*   Deprecate (không xoá cứng)

**8.3. Versioning & Rollback**

*   Mỗi policy có:
    *   Policy ID
    *   Version
    *   Status (draft / active / deprecated)
*   Cho phép rollback **có kiểm soát**

**8.4. Validation & Simulation**

*   Validate:
    *   Syntax
    *   Semantic
*   (Tuỳ chọn) Simulate policy **không ảnh hưởng runtime**

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Policy ID

Định danh

**2**

Policy Type

AuthN / AuthZ / Session

**3**

Version

Phiên bản

**4**

Status

Draft / Active

**5**

Scope

Tenant / Global

**6**

Definition

Policy model

**7**

Owner

Admin

**8**

Timestamp

Thời điểm

**9**

Trace ID

Correlation (AUD‑08)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑ADM‑01‑01

Policy phải gắn Tenant

**2**

BR‑ADM‑01‑02

Mọi thay đổi policy **bắt buộc audit**

**3**

BR‑ADM‑01‑03

Không sửa policy đang active trực tiếp

**4**

BR‑ADM‑01‑04

Policy có versioning

**5**

BR‑ADM‑01‑05

Rollback phải có quyền

**6**

BR‑ADM‑01‑06

Validation bắt buộc

**7**

BR‑ADM‑01‑07

Fail config → không apply

**8**

BR‑ADM‑01‑08

SoD giữa tạo & approve

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Admin chọn Tenant
2.  Chọn loại Policy
3.  Tạo hoặc chỉnh sửa policy (draft)
4.  Validate policy
5.  Activate policy
6.  Ghi Audit Log (AUD‑04 / AUD‑05)
7.  Policy có hiệu lực cho runtime mới

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Policy invalid

Reject

**2**

Conflict policy

Require resolve

**3**

Thiếu quyền

DENY

**4**

Audit log fail

Không activate

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

RBAC, SoD

**2**

Compliance

Full audit

**3**

Reliability

No runtime impact

**4**

Usability

Versioning rõ ràng

**5**

Observability

Traceable

**14\. Ngoài phạm vi (Out of Scope)**

*   Runtime enforcement
*   Authorization decision
*   Token issuance
*   Session handling
*   SIEM analytics

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Policy Configuration ≠ Policy Decision**
*   ADM‑01 là **control plane**
*   Runtime chỉ **consume policy active**

👉 **Keycloak mapping**:

*   Realm / Client / Authz Policy config
*   Admin REST API
*   Admin Events → AUD‑04 / AUD‑05

### ADM‑02 – IAM Configuration – Token Policy

_(Quản trị Chính sách Token IAM)_

**1\. Mã chức năng**

**ADM‑02**

**2\. Tên chức năng**

**IAM Configuration – Token Policy**

**3\. Mô tả tổng quát**

Chức năng **Token Policy Configuration** cho phép **định nghĩa và quản lý tập trung các chính sách liên quan đến vòng đời, bảo mật và cấu trúc Token** trong hệ thống IAM, bao gồm:

*   Access Token / Refresh Token
*   ID Token (OIDC)
*   Token TTL / rotation
*   Token claim & scope mapping
*   Token signing / encryption policy

ADM‑02 thuộc **Administration Plane**, **không trực tiếp phát hành, làm mới hoặc xác thực Token**, mà **chỉ cấu hình chính sách được runtime Token Service áp dụng**.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Authentication Runtime

❌ Không

**2**

Token Runtime (Issue / Validate)

❌ Không

**3**

**Administration Plane (ADM‑02)**

✅ Cấu hình Token Policy

**4**

Audit (AUD‑04 / AUD‑05)

✅ Ghi nhận thay đổi

**5**

Security / Compliance

✅ Kiểm soát

**4\. Mục tiêu nghiệp vụ**

*   Quản trị **Token Policy nhất quán & an toàn**
*   Giảm rủi ro **token abuse / replay**
*   Đáp ứng yêu cầu **Zero‑Trust & Compliance**
*   Hỗ trợ nhiều mô hình OAuth2 / OIDC

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

IAM Admin

Cấu hình Token Policy

**2**

Security Admin

Cấu hình bảo mật Token

**3**

Platform Admin

Cấu hình nền tảng

**4**

Token Service

Consume policy

**5**

Auditor (read‑only)

Kiểm tra

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã authenticate & authorize
*   Có quyền quản trị Token Policy
*   Tenant context được xác định

**7\. Điều kiện hậu (Post‑conditions)**

*   Token Policy được:
    *   Tạo / cập nhật / versioning
    *   Activate / deactivate
*   Thay đổi được audit (AUD‑04 / AUD‑05)
*   Token runtime **chỉ áp dụng cho token mới**

**8\. Phạm vi chức năng**

**8.1. Các loại Token áp dụng**

**#**

**Token**

**Mô tả**

**1**

Access Token

Truy cập resource

**2**

Refresh Token

Gia hạn

**3**

ID Token

Identity (OIDC)

**4**

Device / Service Token

Non‑human identity

**8.2. Nội dung Token Policy**

**🔹 Token Lifetime**

*   Access Token TTL
*   Refresh Token TTL
*   Absolute / Sliding expiration

**🔹 Rotation & Reuse**

*   Refresh token rotation
*   Reuse detection
*   One‑time refresh token

**🔹 Token Structure**

*   JWT / Opaque
*   Claim whitelist / blacklist
*   Scope ↔ claim mapping

**🔹 Signing & Encryption**

*   Signing algorithm (RS256, ES256…)
*   Key rotation policy
*   Encryption (JWE – optional)

**🔹 Audience & Issuer**

*   Audience restriction
*   Issuer binding

**8.3. Scope & Tenant Level**

*   Policy áp dụng:
    *   Global
    *   Per‑Tenant
    *   Per‑Client (override)

**8.4. Versioning & Rollback**

*   Mỗi Token Policy có version
*   Rollback có kiểm soát
*   Không sửa policy đang active

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Token Policy ID

Định danh

**2**

Policy Scope

Global / Tenant / Client

**3**

Token Type

Access / Refresh / ID

**4**

TTL Config

Thời hạn

**5**

Rotation Rule

Chính sách

**6**

Signing Config

Key / Algo

**7**

Status

Draft / Active

**8**

Version

Phiên bản

**9**

Timestamp

Thời điểm

**10**

Trace ID

Correlation (AUD‑08)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑ADM‑02‑01

Token Policy gắn Tenant

**2**

BR‑ADM‑02‑02

Mọi thay đổi **bắt buộc audit**

**3**

BR‑ADM‑02‑03

Không sửa policy đang active

**4**

BR‑ADM‑02‑04

Token mới dùng policy mới

**5**

BR‑ADM‑02‑05

TTL phải trong giới hạn an toàn

**6**

BR‑ADM‑02‑06

Rotation khuyến nghị

**7**

BR‑ADM‑02‑07

Fail config → không activate

**8**

BR‑ADM‑02‑08

SoD giữa tạo & approve

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Admin chọn Tenant / Client
2.  Chọn loại Token
3.  Tạo hoặc chỉnh sửa Token Policy (draft)
4.  Validate policy
5.  Activate policy
6.  Ghi Audit Log (AUD‑04 / AUD‑05)
7.  Runtime áp dụng cho token mới

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

TTL quá dài

Reject

**2**

Algo không an toàn

Reject

**3**

Thiếu quyền

DENY

**4**

Audit log fail

Không activate

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Crypto‑safe

**2**

Compliance

Full audit

**3**

Reliability

No token invalidation

**4**

Scalability

Multi‑tenant

**5**

Observability

Traceable

**14\. Ngoài phạm vi (Out of Scope)**

*   Token issuance
*   Token validation
*   Token revocation runtime
*   Session management
*   SIEM analytics

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Token Policy ≠ Token Runtime**
*   Thay đổi policy **không làm invalid token cũ**
*   Zero‑Trust yêu cầu TTL ngắn + rotation

👉 **Keycloak mapping**:

*   Realm Token Settings
*   Client Token Settings
*   Key & Algorithm config
*   Admin Events → AUD‑04 / AUD‑05

### ADM‑03 – IAM Configuration – Session Policy

_(Quản trị Chính sách Phiên làm việc – IAM Session Policy)_

**1\. Mã chức năng**

**ADM‑03**

**2\. Tên chức năng**

**IAM Configuration – Session Policy**

**3\. Mô tả tổng quát**

Chức năng **Session Policy Configuration** cho phép **định nghĩa và quản lý các chính sách điều khiển vòng đời và hành vi của Session** trong hệ thống IAM, bao gồm:

*   Thời gian sống của session (idle / absolute)
*   Số lượng session đồng thời
*   Điều kiện session termination
*   Session binding (IP, device, risk)
*   Session renewal / re‑authentication

ADM‑03 thuộc **Administration Plane**, **không trực tiếp tạo, gia hạn hay huỷ session**, mà **cấu hình chính sách để Session Runtime Engine áp dụng**.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Authentication Runtime

❌ Không

**2**

Session Runtime (Create / Validate)

❌ Không

**3**

**Administration Plane (ADM‑03)**

✅ Cấu hình Session Policy

**4**

Audit (AUD‑04 / AUD‑05)

✅ Ghi nhận thay đổi

**5**

Security / Compliance

✅ Kiểm soát

**4\. Mục tiêu nghiệp vụ**

*   Kiểm soát **vòng đời session an toàn**
*   Giảm rủi ro **session hijacking / fixation**
*   Hỗ trợ **Zero‑Trust & Risk‑based Access**
*   Đáp ứng yêu cầu **Compliance & Governance**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

IAM Admin

Cấu hình Session Policy

**2**

Security Admin

Cấu hình session bảo mật

**3**

Platform Admin

Cấu hình nền tảng

**4**

Session Runtime Engine

Consume policy

**5**

Auditor (read‑only)

Kiểm tra

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Actor đã authenticate & authorize
*   Có quyền quản trị Session Policy
*   Tenant context được xác định

**7\. Điều kiện hậu (Post‑conditions)**

*   Session Policy được:
    *   Tạo / cập nhật / versioning
    *   Activate / deactivate
*   Thay đổi được audit (AUD‑04 / AUD‑05)
*   **Session đang hoạt động không bị ảnh hưởng ngay**

**8\. Phạm vi chức năng**

**8.1. Nội dung Session Policy**

**🔹 Session Lifetime**

*   **Idle Timeout**: hết hạn khi không hoạt động
*   **Absolute Timeout**: hết hạn tuyệt đối
*   Sliding vs Fixed expiration

**🔹 Concurrent Session Control**

*   Giới hạn số session / user
*   Theo:
    *   User
    *   Device
    *   Client
*   Hành vi khi vượt ngưỡng:
    *   Deny new
    *   Revoke oldest (policy‑driven)

**🔹 Session Binding**

*   Bind session với:
    *   IP address
    *   Device fingerprint
    *   Geo / Risk level
*   Thay đổi binding → require re‑auth

**🔹 Re‑authentication Policy**

*   Re‑auth sau:
    *   Thời gian nhất định
    *   Thay đổi risk
    *   Thực hiện action nhạy cảm
*   Step‑up authentication (MFA)

**🔹 Session Termination Rules**

*   Logout
*   Global logout
*   Admin‑initiated revoke
*   Risk‑based termination

**8.2. Scope áp dụng**

*   Global default
*   Per‑Tenant
*   Per‑Client (override)

**8.3. Versioning & Rollback**

*   Policy có version
*   Không sửa policy đang active
*   Rollback có kiểm soát

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Session Policy ID

Định danh

**2**

Policy Scope

Global / Tenant / Client

**3**

Idle Timeout

Thời gian

**4**

Absolute Timeout

Thời gian

**5**

Max Sessions

Số lượng

**6**

Binding Rule

IP / Device

**7**

Re‑auth Rule

Điều kiện

**8**

Status

Draft / Active

**9**

Version

Phiên bản

**10**

Timestamp

Thời điểm

**11**

Trace ID

Correlation (AUD‑08)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑ADM‑03‑01

Session Policy gắn Tenant

**2**

BR‑ADM‑03‑02

Mọi thay đổi **bắt buộc audit**

**3**

BR‑ADM‑03‑03

Không sửa policy đang active

**4**

BR‑ADM‑03‑04

Session mới dùng policy mới

**5**

BR‑ADM‑03‑05

Timeout phải trong ngưỡng an toàn

**6**

BR‑ADM‑03‑06

Binding change → re‑auth

**7**

BR‑ADM‑03‑07

Fail config → không activate

**8**

BR‑ADM‑03‑08

SoD giữa tạo & approve

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Admin chọn Tenant / Client
2.  Chọn loại Session Policy
3.  Tạo hoặc chỉnh sửa policy (draft)
4.  Validate policy
5.  Activate policy
6.  Ghi Audit Log (AUD‑04 / AUD‑05)
7.  Runtime áp dụng cho session mới

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Timeout không hợp lệ

Reject

**2**

Xung đột policy

Require resolve

**3**

Thiếu quyền

DENY

**4**

Audit log fail

Không activate

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Security

Hijacking prevention

**2**

Compliance

Full audit

**3**

Reliability

No mass logout

**4**

Scalability

High concurrency

**5**

Observability

Traceable

**14\. Ngoài phạm vi (Out of Scope)**

*   Session creation runtime
*   Session validation
*   Token issuance
*   Authorization decision
*   SIEM analytics

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Session Policy ≠ Session Runtime**
*   Thay đổi policy **không huỷ session đang active**
*   Zero‑Trust ưu tiên **short session + re‑auth**

👉 **Keycloak mapping**:

*   Realm Session Settings
*   Client Session Settings
*   User Session Limits
*   Admin Events → AUD‑04 / AUD‑05

### ADM‑04 – Access Review – Role Review

_(Rà soát Quyền truy cập – Role Review / Access Certification)_

**1\. Mã chức năng**

**ADM‑04**

**2\. Tên chức năng**

**Access Review – Role Review**

**3\. Mô tả tổng quát**

Chức năng **Role Review** cho phép tổ chức **định kỳ hoặc theo sự kiện rà soát, xác nhận và điều chỉnh các Role đang được gán cho Identity**, nhằm đảm bảo:

*   Quyền truy cập **đúng người – đúng quyền – đúng thời điểm**
*   Phát hiện **over‑privilege / privilege creep**
*   Đáp ứng yêu cầu **Access Certification / Compliance**

ADM‑04 thuộc **Governance & Administration Plane**, **không tự động quyết định Authorization**, mà **điều phối quy trình review – approve – revoke** dựa trên kết quả đánh giá con người.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Authorization Runtime

❌ Không

**2**

Identity / Role Change

❌ Không trực tiếp

**3**

**Access Governance (ADM‑04)**

✅ Review & Certification

**4**

Audit (AUD‑03 / AUD‑04)

✅ Bằng chứng

**5**

Compliance / GRC

✅ Kiểm soát

**4\. Mục tiêu nghiệp vụ**

*   Đảm bảo **Least Privilege**
*   Thực hiện **Access Certification định kỳ**
*   Hỗ trợ **Separation of Duties (SoD)**
*   Đáp ứng **ISO 27001, SOC2, SOX**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Reviewer (Manager / App Owner)

Đánh giá quyền

**2**

Identity Owner

Chịu trách nhiệm

**3**

IAM Governance Service

Điều phối review

**4**

Admin

Thực thi kết quả

**5**

Auditor (read‑only)

Kiểm tra

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Identity tồn tại
*   Role đã được gán (AUD‑04)
*   Review Campaign được khởi tạo
*   Reviewer được chỉ định hợp lệ

**7\. Điều kiện hậu (Post‑conditions)**

*   Mỗi Role assignment có trạng thái:
    *   Approved
    *   Revoked
    *   Exception (time‑bound)
*   Kết quả được:
    *   Ghi nhận audit
    *   Thực thi thay đổi (nếu revoke)
*   Có **bằng chứng certification**

**8\. Phạm vi chức năng**

**8.1. Đối tượng Review**

**#**

**Đối tượng**

**Mô tả**

**1**

Identity

User / Service account

**2**

Role Assignment

Role ↔ Identity

**3**

Scope (optional)

Scope chi tiết

**4**

Tenant

Ngữ cảnh

**8.2. Kiểu Review**

**#**

**Kiểu**

**Mô tả**

**1**

Periodic Review

Định kỳ (quarterly/yearly)

**2**

Event‑based Review

Khi thay đổi vai trò, chuyển bộ phận

**3**

Risk‑based Review

Quyền nhạy cảm

**4**

On‑demand

Theo yêu cầu audit

**8.3. Quyết định Review**

**#**

**Quyết định**

**Hành vi**

**1**

Approve

Giữ nguyên

**2**

Revoke

Thu hồi role

**3**

Delegate

Chuyển reviewer

**4**

Exception

Cho phép có thời hạn

**8.4. Exception Handling**

*   Exception phải:
    *   Có lý do
    *   Có thời hạn
*   Hết hạn → auto re‑review

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Review Campaign ID

Đợt review

**2**

Identity ID

Đối tượng

**3**

Role ID

Role được review

**4**

Reviewer ID

Người đánh giá

**5**

Decision

Approve / Revoke

**6**

Justification

Lý do

**7**

Due Date

Thời hạn

**8**

Status

Open / Completed

**9**

Timestamp

Thời điểm

**10**

Trace ID

Correlation (AUD‑08)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑ADM‑04‑01

Role nhạy cảm **bắt buộc review**

**2**

BR‑ADM‑04‑02

Reviewer ≠ Identity Owner (SoD)

**3**

BR‑ADM‑04‑03

Không review → auto escalate

**4**

BR‑ADM‑04‑04

Revoke phải thực thi

**5**

BR‑ADM‑04‑05

Exception phải time‑bound

**6**

BR‑ADM‑04‑06

Mọi quyết định **bắt buộc audit**

**7**

BR‑ADM‑04‑07

Kết quả có giá trị pháp lý

**8**

BR‑ADM‑04‑08

Fail review → fail‑secure

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Governance Service tạo Review Campaign
2.  Xác định scope & reviewer
3.  Gửi yêu cầu review
4.  Reviewer đánh giá từng Role
5.  Ghi nhận quyết định
6.  Thực thi revoke (nếu có)
7.  Ghi Audit Log (AUD‑03 / AUD‑04)
8.  Kết thúc campaign

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Reviewer không phản hồi

Escalate

**2**

Conflict of interest

Reassign

**3**

Exception hết hạn

Re‑review

**4**

Audit log fail

Không close campaign

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Compliance

Access Certification

**2**

Security

Least Privilege

**3**

Reliability

No silent privilege

**4**

Scalability

Large org

**5**

Auditability

Evidence‑ready

**14\. Ngoài phạm vi (Out of Scope)**

*   Runtime authorization decision
*   Role definition
*   Token / session handling
*   SIEM analytics
*   Incident response

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Access Review ≠ Role Management**
*   Đây là **governance workflow**, không phải runtime
*   Thiếu Access Review → **compliance fail**

👉 **Keycloak / Enterprise mapping**:

*   External IGA workflow
*   Role assignment data
*   Audit trail via Admin Events

### ADM‑05 – Access Review – Scope Review

_(Rà soát Quyền truy cập Chi tiết – Scope Review / Fine‑grained Access Certification)_

**1\. Mã chức năng**

**ADM‑05**

**2\. Tên chức năng**

**Access Review – Scope Review**

**3\. Mô tả tổng quát**

Chức năng **Scope Review** cho phép tổ chức **rà soát, xác nhận và điều chỉnh các Scope (permission chi tiết) được gán cho Identity, Client hoặc Role**, nhằm đảm bảo:

*   Quyền truy cập **đúng mức chi tiết cần thiết**
*   Ngăn chặn **over‑scoping / excessive permission**
*   Đáp ứng yêu cầu **Fine‑grained Access Certification**

ADM‑05 tập trung vào **Scope (quyền chi tiết)**, trong khi:

*   **ADM‑04**: review Role (macro‑permission)
*   **ADM‑05**: review Scope (micro‑permission)

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Authorization Runtime

❌ Không

**2**

Role / Scope Assignment

❌ Không trực tiếp

**3**

**Access Governance (ADM‑05)**

✅ Scope Review

**4**

Audit (AUD‑04)

✅ Bằng chứng thay đổi

**5**

Compliance / GRC

✅ Kiểm soát

**4\. Mục tiêu nghiệp vụ**

*   Đảm bảo **Least Privilege ở mức Scope**
*   Phát hiện **Scope creep** trong API / Resource
*   Hỗ trợ **API Security & Zero‑Trust**
*   Đáp ứng **SOC2 / ISO 27001 / PCI‑DSS**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Scope Reviewer (App Owner / Security)

Đánh giá

**2**

Resource Owner

Chịu trách nhiệm

**3**

IAM Governance Service

Điều phối

**4**

Admin

Thực thi revoke

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Scope đã tồn tại
*   Scope đã được gán:
    *   Cho Role
    *   Hoặc trực tiếp cho Client / Identity
*   Review Campaign được khởi tạo
*   Reviewer được chỉ định hợp lệ

**7\. Điều kiện hậu (Post‑conditions)**

*   Mỗi Scope assignment có trạng thái:
    *   Approved
    *   Revoked
    *   Exception (time‑bound)
*   Thay đổi được:
    *   Thực thi (nếu revoke)
    *   Ghi Audit Log (AUD‑04)
*   Có **bằng chứng Scope Certification**

**8\. Phạm vi chức năng**

**8.1. Đối tượng Review**

**#**

**Đối tượng**

**Mô tả**

**1**

Scope

Permission chi tiết

**2**

Role–Scope Mapping

Scope trong Role

**3**

Client Scope

Default / Optional scope

**4**

Identity Scope (direct)

Gán trực tiếp

**5**

Tenant

Ngữ cảnh

**8.2. Kiểu Review**

**#**

**Kiểu**

**Mô tả**

**1**

Periodic Review

Định kỳ

**2**

Risk‑based Review

Scope nhạy cảm

**3**

Event‑based Review

API thay đổi

**4**

On‑demand

Theo audit

**8.3. Quyết định Review**

**#**

**Quyết định**

**Hành vi**

**1**

Approve

Giữ nguyên

**2**

Revoke

Gỡ scope

**3**

Reduce

Thu hẹp scope

**4**

Exception

Cho phép có thời hạn

**8.4. Exception Handling**

*   Exception:
    *   Bắt buộc lý do
    *   Có thời hạn
*   Hết hạn → auto re‑review

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Review Campaign ID

Đợt review

**2**

Scope ID

Scope

**3**

Assignment Type

Role / Client / Identity

**4**

Target ID

Role ID / Client ID

**5**

Reviewer ID

Người review

**6**

Decision

Approve / Revoke

**7**

Justification

Lý do

**8**

Due Date

Thời hạn

**9**

Status

Open / Completed

**10**

Timestamp

Thời điểm

**11**

Trace ID

Correlation (AUD‑08)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑ADM‑05‑01

Scope nhạy cảm **bắt buộc review**

**2**

BR‑ADM‑05‑02

Reviewer ≠ Implementer (SoD)

**3**

BR‑ADM‑05‑03

Không phản hồi → escalate

**4**

BR‑ADM‑05‑04

Revoke scope phải thực thi

**5**

BR‑ADM‑05‑05

Exception phải time‑bound

**6**

BR‑ADM‑05‑06

Mọi quyết định **bắt buộc audit**

**7**

BR‑ADM‑05‑07

Scope review độc lập Role review

**8**

BR‑ADM‑05‑08

Fail review → fail‑secure

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Governance Service tạo Scope Review Campaign
2.  Xác định Scope & target (Role / Client)
3.  Gán Reviewer phù hợp
4.  Reviewer đánh giá từng Scope
5.  Ghi nhận quyết định
6.  Thực thi revoke / reduce
7.  Ghi Audit Log (AUD‑04)
8.  Kết thúc campaign

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Reviewer không phản hồi

Escalate

**2**

Scope conflict

Require security review

**3**

Exception hết hạn

Re‑review

**4**

Audit log fail

Không close campaign

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Compliance

Fine‑grained certification

**2**

Security

Least privilege

**3**

Reliability

No excessive scope

**4**

Scalability

Large API set

**5**

Auditability

Evidence‑ready

**14\. Ngoài phạm vi (Out of Scope)**

*   Runtime authorization decision
*   Scope definition
*   Token issuance
*   Session handling
*   SIEM analytics

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Scope Review ≠ Role Review**
*   Scope là **điểm rủi ro lớn nhất trong API security**
*   Zero‑Trust yêu cầu **review scope định kỳ**

👉 **Keycloak / Enterprise mapping**:

*   Client Scope review
*   Role‑Scope mapping review
*   External IGA workflow
*   Audit trail via Admin Events

### ADM‑06 – Access Review – User Access Review

_(Rà soát Quyền truy cập theo Người dùng – User‑centric Access Certification)_

**1\. Mã chức năng**

**ADM‑06**

**2\. Tên chức năng**

**Access Review – User Access Review**

**3\. Mô tả tổng quát**

Chức năng **User Access Review** cho phép tổ chức **rà soát toàn bộ quyền truy cập của một User (Identity) theo góc nhìn tổng thể**, bao gồm:

*   Role được gán
*   Scope / Permission chi tiết
*   Client / Application access
*   Tenant context

Mục tiêu là trả lời câu hỏi cốt lõi của audit & compliance:

**“User này hiện đang có quyền gì, và có còn phù hợp không?”**

ADM‑06 là **user‑centric certification**, khác với:

*   **ADM‑04**: role‑centric review
*   **ADM‑05**: scope‑centric review

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Authorization Runtime

❌ Không

**2**

Role / Scope Assignment

❌ Không trực tiếp

**3**

**Access Governance (ADM‑06)**

✅ User‑centric review

**4**

Audit (AUD‑03 / AUD‑04)

✅ Bằng chứng

**5**

Compliance / GRC

✅ Kiểm soát

**4\. Mục tiêu nghiệp vụ**

*   Đảm bảo **User chỉ có quyền cần thiết**
*   Phát hiện:
    *   Orphaned access
    *   Privilege creep
*   Hỗ trợ:
    *   Joiner / Mover / Leaver (JML)
    *   Periodic access certification
*   Đáp ứng **ISO 27001, SOC2, SOX, GDPR**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Manager / Line Manager

Reviewer chính

**2**

Application Owner

Reviewer phụ

**3**

IAM Governance Service

Điều phối

**4**

Admin

Thực thi revoke

**5**

Auditor (read‑only)

Kiểm toán

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   User tồn tại
*   User có ít nhất một quyền truy cập:
    *   Role
    *   Scope
    *   Client
*   Review Campaign được khởi tạo
*   Reviewer được chỉ định hợp lệ

**7\. Điều kiện hậu (Post‑conditions)**

*   Mỗi quyền của User có trạng thái:
    *   Approved
    *   Revoked
    *   Exception (time‑bound)
*   Quyết định được:
    *   Thực thi (nếu revoke)
    *   Ghi Audit Log
*   Có **User Access Certification Evidence**

**8\. Phạm vi chức năng**

**8.1. Đối tượng Review (User View)**

**#**

**Thành phần**

**Mô tả**

**1**

User / Identity

Đối tượng chính

**2**

Roles

Tất cả role được gán

**3**

Scopes

Scope trực tiếp & gián tiếp

**4**

Clients / Apps

Ứng dụng truy cập

**5**

Tenant

Ngữ cảnh

**8.2. Kiểu Review**

**#**

**Kiểu**

**Mô tả**

**1**

Periodic Review

Định kỳ (quarterly/yearly)

**2**

Event‑based Review

JML, chuyển vai trò

**3**

Risk‑based Review

User quyền cao

**4**

On‑demand

Theo yêu cầu audit

**8.3. Quyết định Review**

**#**

**Quyết định**

**Hành vi**

**1**

Approve All

Giữ toàn bộ

**2**

Selective Revoke

Gỡ quyền cụ thể

**3**

Reduce Access

Giảm role / scope

**4**

Exception

Cho phép có thời hạn

**8.4. Exception Handling**

*   Exception:
    *   Bắt buộc justification
    *   Có expiry date
*   Hết hạn → auto re‑review

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Review Campaign ID

Đợt review

**2**

User ID

Identity

**3**

Access Summary

Role / Scope / App

**4**

Reviewer ID

Người review

**5**

Decision

Approve / Revoke

**6**

Justification

Lý do

**7**

Due Date

Thời hạn

**8**

Status

Open / Completed

**9**

Timestamp

Thời điểm

**10**

Trace ID

Correlation (AUD‑08)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑ADM‑06‑01

User quyền cao **bắt buộc review**

**2**

BR‑ADM‑06‑02

Reviewer ≠ User (SoD)

**3**

BR‑ADM‑06‑03

Không review → escalate

**4**

BR‑ADM‑06‑04

Revoke phải thực thi

**5**

BR‑ADM‑06‑05

Exception phải time‑bound

**6**

BR‑ADM‑06‑06

Mọi quyết định **bắt buộc audit**

**7**

BR‑ADM‑06‑07

User Review bao trùm Role/Scope

**8**

BR‑ADM‑06‑08

Fail review → fail‑secure

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Governance Service tạo User Access Review Campaign
2.  Xác định User & toàn bộ access
3.  Chỉ định Reviewer (Manager / App Owner)
4.  Reviewer xem **full access snapshot**
5.  Reviewer đưa ra quyết định
6.  Thực thi revoke / reduce
7.  Ghi Audit Log (AUD‑03 / AUD‑04)
8.  Đóng campaign & lưu evidence

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Reviewer không phản hồi

Escalate

**2**

Xung đột lợi ích

Reassign reviewer

**3**

Exception hết hạn

Re‑review

**4**

Audit log fail

Không close campaign

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Compliance

User‑level certification

**2**

Security

Least privilege

**3**

Reliability

No orphan access

**4**

Scalability

Large user base

**5**

Auditability

Evidence‑ready

**14\. Ngoài phạm vi (Out of Scope)**

*   Runtime authorization
*   Role / Scope definition
*   Token / session handling
*   SIEM analytics
*   Incident response

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **User Access Review = góc nhìn Auditor thích nhất**
*   Đây là **bằng chứng trực tiếp cho câu hỏi “Who has access to what?”**
*   Thiếu ADM‑06 → **Access Certification không đầy đủ**

👉 **Enterprise / IGA mapping**:

*   User entitlement review
*   Manager attestation
*   Audit trail via Admin Events

### ADM‑07 – Compliance – Audit Export

_(Xuất Audit Log & Evidence phục vụ Kiểm toán / Tuân thủ)_

**1\. Mã chức năng**

**ADM‑07**

**2\. Tên chức năng**

**Compliance – Audit Export**

**3\. Mô tả tổng quát**

Chức năng **Audit Export** cho phép **xuất Audit Log và Access Review Evidence** từ hệ thống IAM ra các định dạng chuẩn, nhằm phục vụ:

*   Kiểm toán nội bộ / bên thứ ba
*   Regulatory audit (ISO, SOC2, SOX, PCI‑DSS, GDPR)
*   Điều tra sự cố & forensic
*   Yêu cầu pháp lý (legal discovery)

ADM‑07 **không tạo log mới**, **không chỉnh sửa log**, và **không phá vỡ tính bất biến (AUD‑06)**; chỉ **đọc và trích xuất dữ liệu đã được governance bảo vệ**.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Audit Runtime (AUD‑01 → 05)

❌ Không

**2**

Log Governance (AUD‑06 / 07 / 08)

✅ Nguồn dữ liệu

**3**

**Compliance Layer (ADM‑07)**

✅ Export

**4**

External Auditor / Regulator

✅ Nhận dữ liệu

**5**

SIEM / GRC Tools

✅ Nhập dữ liệu

**4\. Mục tiêu nghiệp vụ**

*   Cung cấp **bằng chứng audit chính xác & toàn vẹn**
*   Đáp ứng yêu cầu **on‑demand audit**
*   Giảm thời gian chuẩn bị audit
*   Chuẩn hoá dữ liệu cho **GRC / SIEM**

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Compliance Officer

Yêu cầu export

**2**

Auditor / Regulator

Nhận & kiểm tra

**3**

IAM Admin (limited)

Thực hiện export

**4**

Export Engine

Thực thi

**5**

Audit Storage

Cung cấp dữ liệu

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Audit Log tồn tại và bất biến (AUD‑06)
*   Retention hợp lệ (AUD‑07)
*   Người yêu cầu có quyền Compliance Export
*   Scope / thời gian export được xác định

**7\. Điều kiện hậu (Post‑conditions)**

*   Dữ liệu được export:
    *   Đầy đủ
    *   Toàn vẹn
    *   Có thể verify
*   Hành vi export được **audit**
*   Không ảnh hưởng Audit Runtime

**8\. Phạm vi chức năng**

**8.1. Dữ liệu có thể Export**

**#**

**Nhóm**

**Bao gồm**

**1**

Audit Log

AUD‑01 → AUD‑08

**2**

Admin Events

Policy / Config changes

**3**

Access Review Evidence

ADM‑04 / 05 / 06

**4**

Retention Metadata

Policy, Legal Hold

**5**

Correlation Metadata

Trace / Correlation ID

**8.2. Bộ lọc Export**

*   Thời gian (from / to)
*   Tenant
*   Identity / User
*   Event type (AUD‑xx / ADM‑xx)
*   Correlation ID
*   Legal Hold flag

**8.3. Định dạng Export**

*   JSON (machine‑readable)
*   CSV (tabular)
*   PDF (human‑readable, signed)
*   SIEM‑ready format (CEF / LEEF – optional)

**8.4. Integrity & Verification**

*   Export kèm:
    *   Hash
    *   Signature (optional)
    *   Chain reference (AUD‑06)
*   Cho phép auditor **verify integrity**

**8.5. Secure Delivery**

*   Download có kiểm soát
*   Time‑limited access
*   Encrypted at rest / in transit
*   (Optional) Direct push sang SIEM / GRC

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Export Job ID

Định danh

**2**

Requestor

Người yêu cầu

**3**

Scope

Tenant / Time

**4**

Data Types

Audit / Review

**5**

Format

JSON / CSV / PDF

**6**

Hash / Signature

Integrity

**7**

Status

Requested / Completed

**8**

Timestamp

Thời điểm

**9**

Trace ID

Correlation (AUD‑08)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑ADM‑07‑01

Export **read‑only**

**2**

BR‑ADM‑07‑02

Mọi export **bắt buộc audit**

**3**

BR‑ADM‑07‑03

Không export ngoài retention

**4**

BR‑ADM‑07‑04

Legal Hold **cho phép export**

**5**

BR‑ADM‑07‑05

Scope export phải explicit

**6**

BR‑ADM‑07‑06

Data integrity bắt buộc

**7**

BR‑ADM‑07‑07

Fail export → không partial

**8**

BR‑ADM‑07‑08

Access theo nguyên tắc least privilege

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Compliance Officer yêu cầu Audit Export
2.  Xác định scope & thời gian
3.  Validate quyền & policy
4.  Truy xuất dữ liệu immutable
5.  Generate export file + hash
6.  Lưu metadata & audit hành vi export
7.  Cung cấp file cho auditor

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Scope không hợp lệ

Reject

**2**

Thiếu quyền

DENY

**3**

Storage unavailable

Retry

**4**

Integrity fail

Abort export

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Compliance

Audit‑ready

**2**

Security

Confidentiality & Integrity

**3**

Reliability

No data loss

**4**

Performance

Batch‑oriented

**5**

Auditability

Export itself is auditable

**14\. Ngoài phạm vi (Out of Scope)**

*   Real‑time SIEM ingestion
*   Log analytics
*   Incident response
*   Editing / redaction logic
*   External regulator workflow

**15\. Ghi chú kiến trúc (RẤT QUAN TRỌNG)**

*   **Audit Export ≠ Log Access tuỳ ý**
*   Export là **hành vi compliance nhạy cảm**
*   Thiếu ADM‑07 → Audit Governance **không hoàn chỉnh**

👉 **Enterprise / Keycloak mapping**:

*   Admin Events export
*   External SIEM / GRC integration
*   Immutable storage read‑only access

### ADM‑08 – Compliance – Compliance Reporting

_(Báo cáo Tuân thủ IAM – Compliance & Audit Readiness Reporting)_

**1\. Mã chức năng**

**ADM‑08**

**2\. Tên chức năng**

**Compliance – Compliance Reporting**

**3\. Mô tả tổng quát**

Chức năng **Compliance Reporting** cung cấp **báo cáo tổng hợp, có cấu trúc và sẵn sàng cho kiểm toán** dựa trên dữ liệu đã được audit & governance bảo vệ, nhằm:

*   Trả lời nhanh các câu hỏi tuân thủ:
    *   _Ai có quyền gì?_
    *   _Có được review định kỳ không?_
    *   _Audit log có đầy đủ & bất biến không?_
*   Chuẩn bị **audit readiness** trước khi kiểm toán
*   Hỗ trợ **management, compliance officer, auditor**

ADM‑08 **không xuất raw log** (đó là ADM‑07), mà **tổng hợp – chuẩn hoá – trình bày dữ liệu compliance** dưới dạng báo cáo.

**3.1. Định vị trong kiến trúc (Boundary)**

**#**

**Lớp**

**Vai trò**

**1**

Audit Runtime (AUD‑01 → AUD‑08)

❌ Không

**2**

Audit Export (ADM‑07)

❌ Không

**3**

**Compliance Intelligence (ADM‑08)**

✅ Reporting

**4**

Compliance / GRC

✅ Sử dụng

**5**

Management

✅ Giám sát

**4\. Mục tiêu nghiệp vụ**

*   Đảm bảo **Continuous Compliance**
*   Giảm chi phí & thời gian audit
*   Chuẩn hoá báo cáo cho nhiều framework
*   Cung cấp **single source of truth** cho IAM compliance

**5\. Actor (Tác nhân)**

**#**

**Actor**

**Vai trò**

**1**

Compliance Officer

Xem / tạo báo cáo

**2**

Security Manager

Theo dõi tuân thủ

**3**

Auditor (read‑only)

Tham chiếu

**4**

Reporting Engine

Tạo báo cáo

**5**

IAM Admin (limited)

Hỗ trợ

**6\. Điều kiện tiên quyết (Pre‑conditions)**

*   Audit & Access Review đã được thực hiện
*   Dữ liệu còn trong retention (AUD‑07)
*   User có quyền Compliance Reporting
*   Reporting template tồn tại

**7\. Điều kiện hậu (Post‑conditions)**

*   Báo cáo được tạo:
    *   Đúng phạm vi
    *   Có timestamp & metadata
*   Báo cáo **read‑only**
*   Hành vi generate report được **audit**

**8\. Phạm vi chức năng**

**8.1. Các loại Báo cáo**

**#**

**Nhóm**

**Nội dung**

**1**

Access Overview

User → Role → Scope

**2**

Access Review Status

ADM‑04 / 05 / 06

**3**

Privileged Access

User quyền cao

**4**

Policy Compliance

Token / Session / Auth

**5**

Audit Coverage

AUD‑01 → AUD‑08

**6**

Retention & Immutability

AUD‑06 / AUD‑07

**7**

Exception Report

Access exception

**8.2. Framework Mapping (Built‑in)**

*   ISO 27001 / 27002
*   SOC 2 (CC, CC6)
*   SOX
*   PCI‑DSS
*   GDPR (Accountability, Art. 30)

👉 Mỗi report **map control → evidence source**

**8.3. Scope & Filter**

*   Theo:
    *   Tenant
    *   Thời gian
    *   User / Role / App
    *   Control / Framework
*   Hỗ trợ:
    *   Snapshot
    *   Trend (theo thời gian)

**8.4. Định dạng Báo cáo**

*   Web dashboard (read‑only)
*   PDF (auditor‑friendly)
*   CSV (supporting evidence)
*   Executive summary (high‑level)

**9\. Dữ liệu nghiệp vụ chính**

**#**

**Thuộc tính**

**Mô tả**

**1**

Report ID

Định danh

**2**

Report Type

Access / Review / Audit

**3**

Framework

ISO / SOC2 / SOX

**4**

Scope

Tenant / Time

**5**

Generated By

User

**6**

Generated At

Timestamp

**7**

Source Evidence

AUD / ADM refs

**8**

Status

Generated / Archived

**9**

Trace ID

Correlation (AUD‑08)

**10\. Quy tắc nghiệp vụ (Business Rules)**

**#**

**Mã**

**Quy tắc**

**1**

BR‑ADM‑08‑01

Reporting **read‑only**

**2**

BR‑ADM‑08‑02

Mọi report generation **bắt buộc audit**

**3**

BR‑ADM‑08‑03

Report phải trace về evidence

**4**

BR‑ADM‑08‑04

Framework mapping phải rõ ràng

**5**

BR‑ADM‑08‑05

Không hiển thị PII không cần thiết

**6**

BR‑ADM‑08‑06

Scope report phải explicit

**7**

BR‑ADM‑08‑07

Fail generate → không partial

**8**

BR‑ADM‑08‑08

Least privilege access

**11\. Luồng nghiệp vụ chính (Main Flow)**

1.  Compliance Officer chọn loại report
2.  Chọn framework & scope
3.  Reporting Engine truy xuất evidence
4.  Tổng hợp & map control
5.  Generate report
6.  Ghi Audit Log (ADM‑08 activity)
7.  Hiển thị / lưu report

**12\. Luồng thay thế / ngoại lệ**

**#**

**Trường hợp**

**Kết quả**

**1**

Thiếu evidence

Flag trong report

**2**

Scope không hợp lệ

Reject

**3**

Thiếu quyền

DENY

**4**

Data inconsistency

Warning + trace

**13\. Yêu cầu phi chức năng (NFR)**

**#**

**Nhóm**

**Yêu cầu**

**1**

Compliance

Audit‑ready

**2**

Security

Confidentiality

**3**

Reliability

Deterministic

**4**

Performance

Snapshot‑based

**5**

Auditability

Report itself auditable

**14\. Ngoài phạm vi (Out of Scope)**

*   Raw log export (ADM‑07)
*   Real‑time SIEM dashboard
*   Incident response workflow
*   Evidence redaction logic
*   External regulator workflow

# 4\. Yêu cầu Chức năng FE-Admin

## 4.1. Quản lý Tổ chức (Tenant Management)

### 4.1.1. Mô tả chung

Chức năng **Tenant Management** cho phép quản trị viên cấp cao quản lý các **tenant (đơn vị/trường)** trong hệ thống SAE SaaS, bao gồm tạo mới, cập nhật thông tin và quản lý trạng thái hoạt động của từng tenant.

Mỗi tenant đại diện cho **một đơn vị độc lập về dữ liệu, người dùng và phân quyền** (ví dụ: DAV, FTU).
FE‑Admin chỉ cung cấp giao diện quản trị, **không lưu trữ dữ liệu tenant cục bộ**, mọi thao tác đều thông qua **IAM Service** và được ghi nhận **audit log**.

### 4.1.2. Đối tượng sử dụng

#

Vai trò

Quyền truy cập

1

SUPER\_ADMIN

Toàn quyền quản lý tenant

2

TENANT\_ADMIN

Chỉ xem thông tin tenant của mình

3

Các vai trò khác

Không được truy cập

### 4.1.3. Phạm vi chức năng

Chức năng Quản lý tổ chức bao gồm:

*   Xem danh sách tenant trong hệ thống
*   Xem chi tiết thông tin tenant
*   Cập nhật cấu hình tenant
*   Quản lý trạng thái hoạt động của tenant

📌 **Không cho phép xóa tenant đã tồn tại dữ liệu**

### 4.1.4. Đặc tả màn hình chức năng

#### 1️⃣ Màn hình: Tenant List

**![]()**

**a) Xem danh sách Tenant**

**Mô tả:**

*   Hiển thị danh sách các tenant hiện có trong hệ thống.

**Thông tin hiển thị:**

*   Mã tenant (tenant\_code)
*   Tên hiển thị
*   Trạng thái (ACTIVE / SUSPENDED)
*   Ghi chú

**Yêu cầu:**

*   Có chức năng tìm kiếm và lọc theo trạng thái
*   SUPER\_ADMIN xem được toàn bộ
*   TENANT\_ADMIN chỉ xem tenant của mình

**Mục đích**
Cho phép SUPER\_ADMIN/TENANT\_ADMIN xem danh sách tenant trong hệ thống.

**Bố cục**

*   Sidebar: IAM → Tenant Management
*   Khu vực nội dung:
    *   Thanh lọc (Filter)
    *   Bảng danh sách tenant

**Thành phần UI**

#

Thành phần

Mô tả

1

Filter trạng thái

ACTIVE / SUSPENDED

2

Search box

Tìm theo mã / tên tenant

3

Tenant table

Hiển thị danh sách

**Cột dữ liệu**

*   Tenant Code
*   Tenant Name
*   Status
*   Ghi chú

**Hành vi**

*   Click 1 dòng → mở màn hình Tenant Detail
*   TENANT\_ADMIN chỉ thấy tenant của mình

**b) Xem chi tiết Tenant**

**Mô tả:**

*   Hiển thị thông tin chi tiết của một tenant được chọn.

**Thông tin chi tiết bao gồm:**

*   Mã tenant (readonly)
*   Tên hiển thị
*   Trạng thái hoạt động
*   Chính sách rate limit mặc định
*   Chính sách lưu trữ audit (audit retention)
*   Ghi chú cấu hình

#### 2️⃣ Màn hình: Tenant Detail / Configuration

**![]()**

**Mục đích**
Xem và cập nhật cấu hình tenant.

**Bố cục**

*   Panel chi tiết bên phải
*   Dạng form (readonly + editable)

**Thông tin hiển thị**

#

Nhóm

Trường

1

Thông tin cơ bản

Tenant Code (readonly), Tenant Name

2

Trạng thái

ACTIVE / SUSPENDED

3

Cấu hình

Rate Limit, Audit Retention

4

Khác

Ghi chú

**Hành vi**

*   SUPER\_ADMIN được chỉnh sửa
*   Có nút **Save / Cancel**
*   Khi Save:
    *   Gọi IAM Service
    *   Sinh audit log
    *   Yêu cầu confirm

**c) Cập nhật thông tin Tenant**

**Mô tả:**

*   Cho phép SUPER\_ADMIN cập nhật cấu hình tenant.

**Thông tin được phép cập nhật:**

*   Tên hiển thị tenant
*   Trạng thái (ACTIVE / SUSPENDED)
*   Rate limit mặc định
*   Thời gian lưu trữ audit

**Ràng buộc:**

*   Không được thay đổi tenant\_code
*   Không được xóa tenant
*   Thao tác phải có xác nhận (confirm)

**d) Quản lý trạng thái Tenant**

**Mô tả:**

*   Cho phép chuyển tenant giữa các trạng thái:
    *   ACTIVE: Tenant hoạt động bình thường
    *   SUSPENDED: Tạm dừng hoạt động

**Hành vi hệ thống:**

*   Khi tenant bị SUSPENDED:
    *   User thuộc tenant không thể truy cập hệ thống
    *   Mọi request liên quan đến tenant bị từ chối ở IAM Service
*   Khi tenant được kích hoạt lại:
    *   Quyền truy cập được khôi phục theo cấu hình trước đó

#### 3️⃣ Màn hình: Tenant Status Control (SUSPEND / ACTIVATE)

**![]()**

**Mục đích**
Quản lý vòng đời tenant.

**Hành vi hệ thống**

*   Khi SUSPENDED:
    *   IAM từ chối mọi request tenant đó
*   Khi ACTIVE:
    *   Quyền truy cập được khôi phục

**UI**

*   Toggle / Dropdown trạng thái
*   Cảnh báo ảnh hưởng khi suspend

#### 4️⃣ Màn hình Tạo mới Tenant (Create Tenant)

**Mô tả:** Giao diện cho phép Super Admin khởi tạo một Tenant mới trong hệ thống. Khác với màn hình cập nhật, màn hình này cho phép nhập liệu trường định danh quan trọng là Tenant Code.

**Thông tin hiển thị & Nhập liệu:**

1.  **Tenant Code (Bắt buộc):** Mã định danh duy nhất (ví dụ: ftu\_hanoi).
    *   _Quy tắc:_ Chỉ chứa ký tự chữ thường, số, gạch dưới; không trùng lặp trong hệ thống.
2.  **Display Name (Bắt buộc):** Tên hiển thị (ví dụ: Đại học Ngoại thương).
3.  **Admin Email:** Email của người quản trị đầu tiên (sẽ nhận email kích hoạt).
4.  **Domain:** Tên miền chính (ví dụ: ftu.edu.vn).

**Hành vi hệ thống:**

*   Hệ thống kiểm tra trùng lặp Tenant Code ngay khi nhập (inline validation).
*   Sau khi tạo thành công, Tenant ở trạng thái PENDING hoặc ACTIVE tùy cấu hình hệ thống.
*   Ghi audit log: ACTION: CREATE\_TENANT.

### 4.1.5. Luồng xử lý nghiệp vụ (Business Flow)

Admin

↓

FE-Admin IAM

↓

Kong API Gateway

↓ Admin BFF

↓ IAM Core Services (Authorize SUPER\_ADMIN)

↓ Cập nhật Tenant

↓ Phát sinh IAM Audit Event

↓ Trả kết quả về FE-Admin

📌 FE‑Admin không thực hiện logic phân quyền tenant.

### 4.1.6. Yêu cầu phân quyền & bảo mật

*   Chỉ SUPER\_ADMIN được:
    *   Tạo mới / cập nhật tenant
    *   Thay đổi trạng thái tenant
*   Mọi request:
    *   Phải có JWT hợp lệ
    *   Phải có Correlation ID
*   Không cho phép thao tác cross‑tenant

### 4.1.7. Yêu cầu audit & logging

Mọi thao tác quản lý tenant **bắt buộc ghi IAM Audit Log** với các thông tin:

#

Trường

Mô tả

1

action

CREATE\_TENANT / UPDATE\_TENANT / SUSPEND\_TENANT

2

actor\_user\_id

Người thực hiện

3

tenant\_id

Tenant bị tác động

4

old\_value

Giá trị trước khi thay đổi

5

new\_value

Giá trị sau khi thay đổi

6

correlation\_id

ID truy vết

📌 Audit log là **append‑only**, không chỉnh sửa.

### 4.1.8. Yêu cầu phi chức năng liên quan

*   Thời gian phản hồi API: ≤ 2 giây
*   Dữ liệu hiển thị phải đồng bộ với IAM Service
*   Giao diện chỉ hiển thị các trường được phép chỉnh sửa
*   Quy tắc hiển thị & bảo mật UI
    *   Không hiển thị:
        *   DB info
        *   Internal ID
    *   Không có nút Delete
    *   Không chỉnh tenant\_code
    *   Mọi thao tác → audit

### 4.1.9. Tiêu chí nghiệm thu (Acceptance)

Chức năng Tenant Management được nghiệm thu khi:

✅ Phân quyền đúng vai trò
✅ Không thể xóa tenant
✅ Trạng thái tenant ảnh hưởng đúng tới truy cập hệ thống
✅ Audit đầy đủ, truy vết được theo Correlation ID
✅ Không phát sinh cross‑tenant access

## 4.2. Quản lý Người dùng (User Management)

### 4.2.1. Mô tả chung

Chức năng **User Management** cho phép quản trị viên quản lý vòng đời và quyền truy cập của **người dùng (User)** trong phạm vi **một tenant**, bao gồm xem danh sách, xem chi tiết, gán/thu hồi vai trò và kích hoạt/vô hiệu hóa tài khoản.

FE‑Admin **không trực tiếp xử lý xác thực hay phân quyền**, mà đóng vai trò giao diện quản trị, mọi thao tác đều:

*   Thông qua **IAM Service**
*   Tuân thủ **RBAC + ABAC**
*   Được ghi nhận **IAM Audit Log**
*   Gắn **Correlation ID** phục vụ truy vết

### 4.2.2. Đối tượng sử dụng

#

Vai trò

Quyền

1

SUPER\_ADMIN

Quản lý user toàn hệ thống

2

TENANT\_ADMIN

Quản lý user trong tenant của mình

3

IAM\_OPERATOR

Gán/thu hồi role, cập nhật scope

4

Các vai trò khác

Không được truy cập

📌 **TENANT\_ADMIN và IAM\_OPERATOR không được thao tác ngoài tenant được cấp quyền**.

### 4.2.3. Phạm vi chức năng

Chức năng User Management bao gồm:

*   Xem danh sách user theo tenant
*   Xem thông tin chi tiết user
*   Gán / thu hồi role cho user
*   Kích hoạt / vô hiệu hóa user
*   Xem trạng thái và metadata liên quan đến IAM

📌 **Không cho phép chỉnh sửa thông tin xác thực (credential)** từ FE‑Admin IAM.

### 4.2.4. Đặc tả màn hình chức năng

#### 1️⃣ Màn hình: Xem danh sách User

**![]()**

**a) Xem danh sách User**

**Mô tả**
Hiển thị danh sách user thuộc tenant mà người quản trị có quyền truy cập.

**Thông tin hiển thị**

*   User ID / Username
*   Email
*   Role chính
*   Trạng thái (ACTIVE / DISABLED)
*   Ngày tạo

**Yêu cầu**

*   Có filter theo:
    *   Role
    *   Trạng thái
*   Có phân trang (pagination)
*   Không hiển thị:
    *   Password
    *   Token
    *   Secret

#### 2️⃣ Màn hình: Xem chi tiết User

**![]()**

**b) Xem chi tiết User**

**Mô tả**
Hiển thị thông tin chi tiết của một user được chọn.

**Scope (ABAC):** Hiển thị thông tin cấu hình và trạng thái effective scope do IAM Core Services cung cấp; FE-Admin không tự đánh giá quyền

**Thông tin chi tiết**

*   User ID (readonly)
*   Username / Email
*   Tenant
*   Danh sách role đang gán
*   Scope (ABAC – readonly nếu không có quyền)
*   Trạng thái tài khoản
*   Metadata:
    *   Created date
    *   Last login
    *   Last updated by

#### 3️⃣ Màn hình: Gán / Thu hồi Role cho User

**![]()**

**c) Gán / Thu hồi Role cho User**

**Mục đích**
Cho phép quản trị viên **gán hoặc thu hồi role cho một user** trong phạm vi tenant, nhằm kiểm soát quyền truy cập theo mô hình **RBAC**, có xác nhận và ghi nhận audit.

IAM Core Services xử lý việc refresh / invalidate cache phân quyền theo chính sách hệ thống; FE-Admin không thực hiện thao tác kỹ thuật này.

Token cũ có thể bị vô hiệu hóa theo chính sách

**Nguyên tắc**

*   Không gán role ngoài tenant
*   Không gán role system nếu không có quyền
*   Mọi thay đổi → IAM Service → Audit
*   Có confirm trước khi áp dụng

**Giải thích thông tin Màn hình**

**1️⃣ Thông tin User (Readonly – Header)**

*   User ID
*   Username / Email
*   Tenant
*   Trạng thái (ACTIVE / DISABLED)

📌 Giúp admin **xác nhận đúng user** trước khi thao tác role.

**2️⃣ Role đang được gán (Assigned Roles)**

*   Danh sách role hiện tại của user
*   Hiển thị dạng **chip/tag**
*   Mỗi role có nút **Remove (Thu hồi)**

📌 Role system hoặc role bắt buộc → disable remove (minh họa).

**3️⃣ Role khả dụng (Available Roles)**

*   Danh sách role trong tenant
*   Có search / filter (wireframe)
*   Checkbox chọn role để gán

📌 Chỉ hiển thị role mà admin được phép gán.

**4️⃣ Preview thay đổi (Change Preview)**

*   Hiển thị rõ:
    *   Role sẽ **được thêm**
    *   Role sẽ **bị thu hồi**
*   So sánh **Before → After**

➡️ Rất quan trọng cho nghiệm thu & audit.

**5️⃣ Confirm & Apply**

*   Checkbox xác nhận:

“Tôi xác nhận việc thay đổi role cho user này”

*   Nút:
    *   ✅ Apply Changes
    *   ❌ Cancel

📌 Chưa tick confirm → không cho submit

**Hành vi hệ thống**

FE‑Admin

→ IAM Service (authorize IAM\_OPERATOR / TENANT\_ADMIN)

→ Update User Roles

→ Invalidate / refresh permission cache

→ Ghi IAM Audit:

\- ASSIGN\_ROLE

\- REVOKE\_ROLE

→ Trả kết quả

*   Sau khi cập nhật role:
    *   Quyền có hiệu lực ngay hoặc sau khi invalidate cache
    *   Token cũ có thể bị vô hiệu hóa theo chính sách

#### 4️⃣ Màn hình: Kích hoạt / Vô hiệu hóa User

**![]()**

**Mô tả**
Cho phép khóa hoặc mở lại tài khoản user.

**Trạng thái**

*   ACTIVE: User được phép đăng nhập và truy cập hệ thống
*   DISABLED: User không thể đăng nhập

**Hành vi hệ thống**

*   Khi DISABLED:
    *   Token hiện tại bị thu hồi hoặc hết hiệu lực
    *   IAM từ chối mọi request từ user
*   Khi ACTIVE:
    *   User có thể đăng nhập lại theo quyền được gán

📌 **Không xóa user khỏi hệ thống để đảm bảo audit & forensic**.

#### 5\. Màn hình Tạo mới Người dùng (Create User)

**Mô tả:** Cho phép tạo thủ công một người dùng mới trong Tenant. Thường sử dụng cho các trường hợp tạo tài khoản đặc biệt (Admin, Khách) không qua luồng đồng bộ tự động.

**Bố cục màn hình (Drawer/Modal):**

*   **Tab Hồ sơ:** Username, Email, Họ tên, Loại người dùng (Student/Staff).
*   **Tab Thuộc tính (Attributes):** Các trường mở rộng như Mã SV, Khoa, Khóa (K62...).
*   **Tab Bảo mật:** Thiết lập mật khẩu ban đầu (Gửi email kích hoạt hoặc Đặt thủ công).

**Quy tắc nghiệp vụ:**

*   Username phải duy nhất trong Tenant.
*   Không được phép tạo User với các Role hệ thống cao cấp (System Admin) nếu người tạo không đủ quyền.

#### 6\. Màn hình Đồng bộ Người dùng (User Sync Wizard)

**Mô tả:** Giao diện hỗ trợ quy trình nhập liệu hàng loạt (Bulk Import) hoặc đồng bộ từ hệ thống ngoài (LDAP/AD). Được thiết kế dạng Wizard (Từng bước) để giảm thiểu sai sót.

**Các bước thực hiện:**

1.  **Bước 1 - Chọn nguồn (Source):**
    *   Tùy chọn: Upload File (Excel/CSV) hoặc Kết nối LDAP/AD.
    *   Khu vực Drag & Drop file mẫu.
2.  **Bước 2 - Ánh xạ dữ liệu (Mapping):**
    *   Hiển thị bảng so khớp: _Cột trong File_ ➔ _Trường trong IAM_.
    *   Cấu hình xử lý trùng lặp: _Bỏ qua (Skip)_ hoặc _Ghi đè (Update)_.
3.  **Bước 3 - Kiểm tra & Thực thi (Preview & Run):**
    *   Hiển thị số lượng bản ghi hợp lệ / lỗi.
    *   Xem trước (Preview) 5-10 dòng dữ liệu đầu tiên.
    *   Nút "Thực thi" để chạy tiến trình nền (Background Job).

### 4.2.5. Luồng xử lý nghiệp vụ (Business Flow)

Admin → FE‑Admin IAM

→ IAM Service (Authorize request)

→ Thực hiện thao tác User (assign role / disable user)

→ Ghi IAM Audit

→ Trả kết quả cho FE‑Admin

### 4.2.6. Yêu cầu phân quyền & bảo mật

*   Mọi thao tác phải:
    *   Có JWT hợp lệ
    *   Được IAM Service authorize
*   Không cho phép:
    *   Cross‑tenant user access
    *   FE bypass IAM
*   Scope (ABAC) chỉ hiển thị/chỉnh sửa nếu có quyền

### 4.2.7. Yêu cầu audit & logging

Mọi thao tác quản lý user **bắt buộc ghi IAM Audit Log** với các thông tin:

#

Trường

Mô tả

1

action

VIEW\_USER / ASSIGN\_ROLE / REVOKE\_ROLE / ACTIVATE\_USER / DEACTIVATE\_USER

2

actor\_user\_id

Người thực hiện

3

target\_user\_id

User bị tác động

4

tenant\_id

Tenant liên quan

5

result

SUCCESS / DENY

6

correlation\_id

ID truy vết

📌 Audit log là **append‑only**, không chỉnh sửa.

### 4.2.8. Yêu cầu phi chức năng liên quan

*   Thời gian phản hồi API: ≤ 2 giây
*   Danh sách user lớn phải có pagination
*   Dữ liệu hiển thị phải đồng bộ realtime/near‑realtime với IAM Service

### 4.2.9. Tiêu chí nghiệm thu (Acceptance)

Chức năng User Management được nghiệm thu khi:

✅ Phân quyền đúng theo vai trò
✅ Không thao tác được user ngoài tenant
✅ Role được gán/thu hồi đúng
✅ User bị disable không thể đăng nhập
✅ Audit đầy đủ, truy vết được bằng Correlation ID

➡️ **PASS = Đạt chuẩn SRS**

## 4.3. Quản lý Vai trò và Quyền truy cập (RBAC)

### 4.3.1. Mô tả chung

Chức năng **Role & Permission Management** cho phép quản trị viên quản lý **vai trò (Role)** và **quyền truy cập (Permission)** trong hệ thống IAM theo mô hình **RBAC (Role‑Based Access Control)**, nhằm kiểm soát chặt chẽ quyền thực thi chức năng và truy cập tài nguyên của người dùng.

Role và Permission được quản lý trong FE-Admin IAM là **role và quyền nghiệp vụ**, không đồng nhất với role kỹ thuật trong Identity Provider.

Token chỉ mang role coarse‑grained; IAM Core Services thực hiện mapping role → permission và đánh giá quyền truy cập thực tế.

FE‑Admin IAM **không thực thi phân quyền trực tiếp**, mà:

*   Cung cấp giao diện quản trị
*   Gửi yêu cầu tới **IAM Service**
*   IAM Service là nguồn quyết định cuối cùng
*   Mọi thay đổi đều được **ghi IAM Audit Log**

### 4.3.2. Đối tượng sử dụng

**#**

**Vai trò**

**Quyền**

1

SUPER\_ADMIN

Quản lý role & permission toàn hệ thống

2

TENANT\_ADMIN

Quản lý role trong tenant của mình

3

IAM\_OPERATOR

Gán permission cho role theo scope được cấp

4

Các vai trò khác

Không được truy cập

📌 **TENANT\_ADMIN / IAM\_OPERATOR không được thao tác role ngoài tenant**.

### 4.3.3. Phạm vi chức năng

Chức năng Role & Permission Management bao gồm:

*   Xem danh sách role
*   Xem chi tiết role
*   Tạo mới role (tenant‑level)
*   Cập nhật permission cho role
*   Gán role cho user (liên kết với 3.2)
*   Kích hoạt / vô hiệu hóa role

📌 **Không cho phép xóa role để đảm bảo audit & tính toàn vẹn phân quyền**.

### 4.3.4. Đặc tả màn hình chức năng

#### 1️⃣ Màn hình: Xem danh sách Role

**![]()**

**Mô tả**
Hiển thị danh sách role theo phạm vi tenant hoặc system.

**Thông tin hiển thị**

*   Role Code
*   Role Name
*   Scope (System / Tenant / Business)
*   Trạng thái (ACTIVE / DISABLED)
*   Số lượng user đang sử dụng

**Yêu cầu**

*   Có filter theo:
    *   Scope
    *   Trạng thái
*   Không hiển thị permission chi tiết tại danh sách

#### 2️⃣ Màn hình: Xem chi tiết Role

**![]()**

**Mô tả**

![]()

**Thông tin chi tiết**

*   Role Code (readonly)
*   Role Name
*   Mô tả
*   Scope
*   Danh sách permission được gán
*   Metadata:
    *   Created date
    *   Last updated by
    *   Last updated time

📌 **Role system hiển thị read‑only đối với TENANT\_ADMIN**.

#### 3️⃣ Màn hình: Tạo mới / Cập nhật Role (Tenant level)

Màn hình Tạo mới Role (Tenant level)

![]()

Màn hình Cập nhật Role (Tenant level)

![]()

**Mô tả**
Cho phép tạo role mới /cập nhật role trong phạm vi tenant nhằm đáp ứng yêu cầu nghiệp vụ riêng.

![]()

**Ràng buộc**

*   Role code là duy nhất trong tenant
*   Không tạo role system từ FE‑Admin
*   Role mới mặc định ở trạng thái ACTIVE

**Hành vi hệ thống**

*   Validate trùng role
*   Gọi IAM Service tạo role
*   Ghi audit CREATE\_ROLE

#### 4️⃣ Màn hình: Gán / Thu hồi Permission cho Role

**![]()**

**Mô tả**
Cho phép gán hoặc thu hồi permission cho một role nhằm xác định quyền truy cập chức năng/tài nguyên.

![]()

**Permission có thể bao gồm**

*   API permission
*   UI feature permission
*   Business operation permission

**Ràng buộc**

*   Chỉ gán permission hợp lệ theo scope
*   Không gán permission system nếu không có quyền
*   Phải có xác nhận (confirm)

**Hành vi hệ thống**

*   Permission có hiệu lực ngay hoặc sau khi refresh cache
*   Token hiện tại của user có thể cần refresh

#### 5️⃣ Màn hình: Kích hoạt / Vô hiệu hóa Role

**![]()**

**Mô tả**
Quản lý trạng thái sử dụng của role.

![]()

**Trạng thái**

*   ACTIVE: Role có thể được gán và sử dụng
*   DISABLED: Role không được gán thêm và không có hiệu lực

**Hành vi hệ thống**

*   Khi DISABLED:
    *   Role không được dùng để authorize
    *   User đang có role vẫn giữ record nhưng quyền không hiệu lực
*   Không xóa role khỏi hệ thống

#### 6\. Màn hình Ma trận Phân quyền (Permission Matrix)

**Mô tả:** Giao diện trực quan cho phép Admin gán các quyền (Permissions) vào Vai trò (Role). Thay vì chọn từ một danh sách phẳng (dropdown list), giao diện này hiển thị dạng Ma trận hoặc Cây phân nhóm (Tree view).

**Cấu trúc hiển thị:**

*   **Nhóm chức năng (Module):** Phân nhóm quyền theo nghiệp vụ (ví dụ: User Mgmt, Activity Mgmt, Reporting).
*   **Checkbox Quyền:**
    *   Mỗi dòng là một quyền cụ thể (ví dụ: user:read, user:write).
    *   Có mô tả ngắn gọn ý nghĩa của quyền.
*   **Tính năng chọn nhanh:** Checkbox "Select All" cho từng nhóm.

**Hành vi:**

*   Các quyền thuộc nhóm "System Only" sẽ bị ẩn hoặc vô hiệu hóa (disabled) đối với Tenant Admin.
*   Hệ thống tự động tính toán lại quyền thừa kế nếu có.

#### 7\. Màn hình Thành viên của Vai trò (Role Members)

**Mô tả:** Tab hiển thị danh sách tất cả người dùng đang nắm giữ vai trò hiện tại.

**Chức năng:**

*   **Danh sách:** Hiển thị User ID, Email, Ngày gán quyền.
*   **Thao tác nhanh:** Nút "Remove" (🗑️) để thu hồi vai trò của người dùng đó ngay lập tức.
*   **Thêm thành viên:** Nút "Add Member" cho phép tìm kiếm và thêm người dùng vào vai trò này.

### 4.3.5. Luồng xử lý nghiệp vụ (Business Flow)

Admin → FE‑Admin IAM

→ IAM Service (Authorize)

→ Thực hiện thao tác Role / Permission

→ Ghi IAM Audit

→ Trả kết quả cho FE‑Admin

### 4.3.6. Yêu cầu phân quyền & bảo mật

*   Mọi thao tác phải:
    *   Có JWT hợp lệ
    *   Được IAM Service authorize
*   Không cho phép:
    *   Cross‑tenant role management
    *   Thao tác trực tiếp DB
*   Role system được bảo vệ ở mức IAM

### 4.3.7. Yêu cầu audit & logging

Mọi thao tác liên quan role/permission **bắt buộc ghi IAM Audit Log**:

**#**

**Trường**

**Mô tả**

1

action

CREATE\_ROLE / UPDATE\_ROLE / ASSIGN\_PERMISSION / REVOKE\_PERMISSION / DISABLE\_ROLE

2

actor\_user\_id

Người thực hiện

3

role\_code

Role bị tác động

4

tenant\_id

Tenant liên quan

5

old\_value

Trước khi thay đổi

6

new\_value

Sau khi thay đổi

7

correlation\_id

ID truy vết

📌 Audit log là **append‑only**, không chỉnh sửa.

### 4.3.8. Yêu cầu phi chức năng liên quan

*   Thời gian phản hồi API: ≤ 2 giây
*   Danh sách permission lớn phải có pagination
*   Thay đổi permission phải được đồng bộ realtime/near‑realtime

### 4.3.9. Tiêu chí nghiệm thu (Acceptance)

Chức năng Role & Permission Management được nghiệm thu khi:

✅ Tạo role tenant thành công Không thao tác được role ngoài tenant
✅ Permission gán/thu hồi đúng scope
✅ Role DISABLED không có hiệu lực
✅ Audit đầy đủ, truy vết được

➡️ **PASS = Đạt chuẩn SRS**

## 4.4. Quản lý Phạm vi dữ liệu (Scopes) (ABAC)

### 4.4.1. Mô tả chung

Chức năng **Scope / Attribute‑Based Access Management** cho phép quản trị viên định nghĩa và quản lý **phạm vi truy cập (Scope)** và **thuộc tính truy cập (Attributes)** được sử dụng trong mô hình **ABAC (Attribute‑Based Access Control)**, nhằm kiểm soát **phạm vi dữ liệu và ngữ cảnh truy cập** của user một cách linh hoạt và chi tiết hơn so với RBAC thuần.

Trong hệ thống IAM:

*   **RBAC** quyết định _user được phép làm gì_
*   **ABAC (Scope)** quyết định _user được phép làm điều đó trên dữ liệu nào_

FE‑Admin **chỉ cung cấp giao diện quản trị**, mọi logic đánh giá cuối cùng thuộc về **IAM Service**.

### 4.4.2. Đối tượng sử dụng

#

Vai trò

Quyền

1

SUPER\_ADMIN

Quản lý toàn bộ Scope & Attribute

2

TENANT\_ADMIN

Quản lý Scope trong tenant

3

IAM\_OPERATOR

Gán Scope cho User / Role theo policy

4

Các vai trò khác

Không được truy cập

📌 **Không cho phép quản lý Scope ngoài tenant** trừ SUPER\_ADMIN.

### 4.4.3. Khái niệm & thuật ngữ

#### a) Phạm vi / Scope

Là tập các giá trị xác định **phạm vi dữ liệu hoặc ngữ cảnh truy cập**, ví dụ:

*   Khoa / Phòng ban
*   Đơn vị tổ chức
*   Chương trình đào tạo
*   Năm học
*   Dữ liệu theo vùng (region)

#### b) Thuộc tính / Attribute

Là cặp **key – value** được IAM sử dụng để đánh giá quyền, ví dụ:

{

"department": "IT",

"faculty": "Computer Science",

"campus": "Hanoi"

}

#### c) Chính sách đánh giá quyền / Policy Evaluation

IAM kết hợp:

*   Role (RBAC)
*   Permission
*   Scope / Attribute (ABAC)

để quyết định **ALLOW / DENY** cho mỗi request.

### 4.4.4. Phạm vi chức năng

Chức năng Scope Management bao gồm:

*   Xem danh sách Scope
*   Tạo mới / cập nhật Scope
*   Kích hoạt / vô hiệu hóa Scope
*   Gán Scope cho User
*   Gán Scope cho Role
*   Xem Scope đang áp dụng cho User / Role

📌 **Không cho phép xóa Scope** để đảm bảo audit & lịch sử truy cập.

### 4.4.5. Đặc tả màn hình chức năng

#### 1️⃣ Màn hình: Xem danh sách và Chi tiết Scope

**Màn hình Xem danh sách Scope**

**![]()**

**Màn hình Xem Chi tiết Scope**
**![]()**

**Mô tả**
Hiển thị danh sách Scope hiện có trong tenant hoặc hệ thống.

![]()

**Thông tin hiển thị danh sách Scope**

*   Scope Code
*   Scope Name
*   Attribute Key
*   Trạng thái (ACTIVE / DISABLED)
*   Đối tượng áp dụng (User / Role / Both)
*   Số lượng user/role đang sử dụng

![]()

**Thông tin hiển thị Chi tiết Scope**

**1️⃣ Thông tin Scope (Scope Overview)**

*   Scope Code (readonly, immutable)
*   Scope Name
*   Attribute Key
*   Allowed Values (hiển thị dạng chip)
*   Applies To: User / Role / Both
*   Tenant
*   Status: ACTIVE / DISABLED

**2️⃣ Mô tả & Metadata**

*   Description (nghiệp vụ)
*   Created at
*   Last updated by
*   Last updated at

📌 Phục vụ **audit / kiểm toán / truy vết thay đổi**

**3️⃣ Đối tượng đang sử dụng Scope**

*   ✅ Tab User đang gán Scope
*   ✅ Tab Role đang gán Scope
*   Hiển thị:
    *   User ID / Username / Role Code
    *   Nguồn gán (Direct / Inherited from Role)
*   Phân biệt rõ:
    *   **Scope gán trực tiếp**
    *   **Scope kế thừa từ Role**

**4️⃣ Trạng thái Scope & kiểm soát**

*   Hiển thị trạng thái hiện tại
*   Nút điều hướng:
    *   👉 **Activate / Disable Scope**
    *   👉 **Assign Scope to User**
    *   👉 **Assign Scope to Role**

📌 Không chỉnh trực tiếp tại màn này → đảm bảo kiểm soát thao tác.

**5️⃣ Audit awareness panel**

*   Gợi ý audit actions:
    *   VIEW\_SCOPE\_DETAIL
    *   UPDATE\_SCOPE
    *   ASSIGN\_SCOPE
    *   REVOKE\_SCOPE
    *   DISABLE\_SCOPE
*   Trường bắt buộc:
    *   actor\_user\_id
    *   scope\_code
    *   target\_type
    *   target\_id
    *   old\_value / new\_value
    *   correlation\_id

#### 2️⃣ Màn hình: Tạo mới / Cập nhật Scope

**Tạo mới Scope**

**![]()**

**Cập nhật Scope**

**![]()**

**Mô tả**
Cho phép định nghĩa Scope mới hoặc cập nhật thông tin Scope hiện có.

![]()

**Thông tin cấu hình**

*   Scope Code (unique, immutable)
*   Scope Name
*   Attribute Key (ví dụ: department, faculty)
*   Allowed Values (list / wildcard)
*   Trạng thái

**Ràng buộc**

*   Scope Code không được sửa sau khi tạo
*   Không trùng Attribute Key + Scope Code trong cùng tenant

**Audit**

*   CREATE\_SCOPE
*   UPDATE\_SCOPE

#### 3️⃣ Màn hình: Kích hoạt / Vô hiệu hóa Scope

**![]()**

**Mô tả**
Quản lý hiệu lực của Scope trong quá trình authorize.

![]()

**Hành vi**

*   ACTIVE: Scope được IAM sử dụng khi evaluate policy
*   DISABLED: Scope bị bỏ qua, nhưng không bị xóa

📌 User/Role vẫn giữ tham chiếu Scope để phục vụ audit.

#### 4️⃣ Màn hình: Gán Scope cho User

![]()

**Mô tả**
Cho phép gán một hoặc nhiều Scope cho User nhằm giới hạn phạm vi dữ liệu.

![]()

**Ví dụ**

*   User có Role TEACHER
*   Scope faculty=IT → User chỉ truy cập dữ liệu của khoa IT

**Ràng buộc**

*   Scope phải thuộc tenant
*   Phải phù hợp với policy IAM

#### 5️⃣ Màn hình: Gán Scope cho Role

**![]()**

**Mô tả**
Gán Scope mặc định cho Role để mọi User sở hữu Role đều kế thừa Scope này.

![]()

**Thứ tự ưu tiên**

1.  Scope gán trực tiếp cho User
2.  Scope gán cho Role
3.  Scope mặc định của tenant (nếu có)

#### 6️⃣ Màn hình: Xem Scope đang áp dụng cho User / Role

**Màn hình – Tab User sử dụng Scope:**

**![]()**

**Màn hình – Tab Role sử dụng Scope:**

**![]()**

**Mô tả chi tiết thông tin Màn hình:**

**1️⃣ Scope Context (Readonly)**

*   Scope Code, Name
*   Attribute Key + Values
*   Applies To (User / Role / Both)
*   Tenant
*   Status (ACTIVE / DISABLED)

**2️⃣ Impact Summary (Quick glance)**

*   👤 Số **User bị ảnh hưởng**
*   🎭 Số **Role đang gán Scope**
*   ⚠️ Cảnh báo nếu:
    *   Scope áp dụng cho nhiều Role
    *   Scope ảnh hưởng nhiều User (> threshold)

**3️⃣ Tabs: Scope Usage**

**🧑‍💼 Tab User Impact**

Bảng:

*   User ID / Username
*   Nguồn Scope:
    *   ✅ Direct
    *   🔁 Inherited via Role
*   Role liên quan
*   Effective Scope (đã merge)
*   Link nhanh:
    *   👉 Assign Scope cho User
    *   👉 User Detail

**🎭 Tab Role Impact**

Bảng:

*   Role Code / Role Name
*   Số User kế thừa Scope
*   Scope type (Role-level)
*   Link:
    *   👉 Assign Scope cho Role
    *   👉 Role Detail

**4️⃣ Impact Reasoning Panel (ABAC-aware)**

Giải thích:

*   Nếu **Disable Scope** → phạm vi dữ liệu:
    *   ✅ Mở rộng
    *   ❌ Hoặc vẫn bị giới hạn (do scope khác)
*   Nếu **Revoke khỏi Role** → ảnh hưởng dây chuyền tới user

**5️⃣ Audit Awareness**

Gợi ý audit:

*   VIEW\_SCOPE\_USAGE
*   Trường bắt buộc:
    *   actor\_user\_id
    *   scope\_code
    *   tenant\_id
    *   correlation\_id

Màn hình này không chỉnh cấu hình, mà dùng để:

*   ✅ Nhìn nhanh **Scope đang ảnh hưởng tới ai**
*   ✅ Phân biệt **Direct vs Inherited (từ Role)**
*   ✅ Đánh giá **impact khi Disable / Revoke Scope**
*   ✅ Hỗ trợ **audit, kiểm soát rủi ro phân quyền**

#### 7\. Màn hình Xây dựng Luật (Visual Rule Builder)

**Mô tả:** Giao diện đồ họa giúp Admin định nghĩa các quy tắc ABAC phức tạp mà không cần viết code (Policy-as-Code ẩn phía sau).

**Cấu trúc UI:**

*   **Khối điều kiện (Logic Block):** Chọn toán tử logic (AND, OR).
*   **Dòng quy tắc (Rule Row):**
    *   _Subject Field:_ Chọn thuộc tính người dùng (VD: User.Department).
    *   _Operator:_ Chọn toán tử so sánh (Equals, Contains, Starts With).
    *   _Resource Field/Value:_ Chọn thuộc tính tài nguyên (VD: Resource.OwnerDepartment) hoặc giá trị tĩnh.
*   **Generated Expression:** Hiển thị chuỗi logic sinh ra (VD: user.dept == res.dept) để kiểm tra.

**Mục đích:** Giúp cấu hình các Scope động (Dynamic Scopes) như "Xem dữ liệu khoa của mình", "Chỉ xem hồ sơ do mình tạo".

### 4.4.6. Luồng xử lý nghiệp vụ (Business Flow)

Request (kèm tenant context)

↓

IAM Core Services

↓ Load Role & Permission (tenant‑scoped)

↓ Load Scope / Attribute (tenant‑scoped)

↓ Evaluate Policy (RBAC + ABAC)

↓ Decision: ALLOW / DENY

### 4.4.7. Yêu cầu phân quyền & bảo mật

*   Mọi thao tác phải:
    *   Có JWT hợp lệ
    *   Được IAM authorize
*   Không cho phép:
    *   Cross‑tenant Scope assignment
    *   Bypass IAM policy
*   Attribute key/value phải được validate

### 4.4.8. Yêu cầu audit & logging

Mọi thao tác liên quan Scope **bắt buộc ghi IAM Audit Log**:

#

Trường

Mô tả

1

action

CREATE\_SCOPE / UPDATE\_SCOPE / ASSIGN\_SCOPE / REVOKE\_SCOPE / DISABLE\_SCOPE

2

actor\_user\_id

Người thao tác

3

target\_type

USER / ROLE

4

target\_id

User ID hoặc Role Code

5

scope\_code

Scope bị tác động

6

old\_value

Trước khi thay đổi

7

new\_value

Sau khi thay đổi

8

correlation\_id

ID truy vết

📌 Audit log là **append‑only**.

### 4.4.9. Yêu cầu phi chức năng

*   Thời gian evaluate policy ≤ 50ms
*   Scope lớn phải hỗ trợ caching
*   Thay đổi Scope phải đồng bộ realtime / near‑realtime

### 4.4.10. Tiêu chí nghiệm thu (Acceptance)

Scope được tạo và áp dụng đúng tenant User chỉ truy cập dữ liệu trong Scope

✅ Scope DISABLED không còn hiệu lực
✅ Audit đầy đủ, truy vết được

➡️ **PASS = Đạt chuẩn SRS**

## 4.5. Giám sát hoạt động Phân quyền

### 4.5.1. Mô tả chung

Chức năng **Authorization Monitoring** cung cấp khả năng **giám sát, theo dõi và phân tích các quyết định phân quyền (authorization decisions)** do IAM Service thực hiện trong quá trình xử lý request truy cập tài nguyên.

Mục tiêu của chức năng này:

*   Minh bạch hóa việc **ALLOW / DENY** trong RBAC + ABAC
*   Hỗ trợ **vận hành, kiểm toán, điều tra sự cố và đánh giá rủi ro**
*   Cho phép quản trị viên **truy vết nguyên nhân** của từng quyết định authorization

📌 **Authorization Monitoring là chức năng read‑only**, không can thiệp trực tiếp vào logic cấp quyền hay policy evaluation.

**📌 LƯU Ý:**
Phát hiện xu hướng bất thường mang tính hiển thị và hỗ trợ phân tích, không thay thế SOC Engine.

### 4.5.2. Đối tượng sử dụng

#

Vai trò

Quyền

1

SUPER\_ADMIN

Xem toàn bộ authorization log (cross‑tenant)

2

TENANT\_ADMIN

Xem authorization log trong tenant

3

IAM\_SECURITY / IAM\_AUDITOR

Xem, lọc, phân tích log

4

IAM\_OPERATOR

Chỉ xem log liên quan đến nghiệp vụ được phân quyền

5

Vai trò khác

Không được truy cập

### 4.5.3. Phạm vi giám sát

Authorization Monitoring bao phủ các quyết định:

*   API authorization (REST / GraphQL)
*   UI action authorization (button, feature)
*   Data‑level authorization (Scope / Attribute)
*   Token‑based authorization (JWT claims)
*   Policy decision (RBAC + ABAC)

📌 **Không bao gồm authentication (login/logout)** – thuộc phạm vi Authentication Monitoring.

### 4.5.4. Khái niệm & thuật ngữ

#### a) Authorization Decision

Kết quả đánh giá quyền truy cập của IAM cho một request:

*   ALLOW
*   DENY

#### b) Evaluation Context

Tập thông tin dùng để đánh giá quyền:

*   User / Role
*   Permission
*   Scope / Attribute
*   Resource
*   Action
*   Environment (IP, time, channel…)

#### c) Authorization Log

Bản ghi immutable ghi lại **toàn bộ quyết định authorize**.

### 4.5.5. Phạm vi chức năng

Authorization Monitoring bao gồm:

*   Xem danh sách authorization log
*   Xem chi tiết từng quyết định authorize
*   Lọc, tìm kiếm theo nhiều tiêu chí
*   Phân tích nguyên nhân ALLOW / DENY
*   Phát hiện xu hướng bất thường (read‑only)

📌 **Không cho phép chỉnh sửa hoặc xóa log**.

### 4.5.6. Đặc tả màn hình chức năng

#### 1️⃣ Màn hình: Xem danh sách Authorization Log

**![]()**

**Mô tả**
Hiển thị danh sách các request đã được IAM evaluate authorization.

![]()

**Thông tin hiển thị**

*   Timestamp
*   Decision (ALLOW / DENY)
*   User ID / Username
*   Tenant
*   Resource
*   Action
*   Source (API / UI)
*   Correlation ID

#### 2️⃣ Màn hình: Lọc & tìm kiếm Authorization Log

**![]()**

**Tiêu chí lọc**

*   Thời gian (from – to)
*   Decision (ALLOW / DENY)
*   User / Role
*   Resource / Action
*   Scope / Attribute
*   Tenant
*   IP / Channel

📌 Phải hỗ trợ **kết hợp nhiều điều kiện lọc**.

#### 3️⃣ Màn hình: Xem chi tiết Authorization Decision

**![]()**

**Mô tả**
Cho phép xem **toàn bộ ngữ cảnh và lý do** của một quyết định authorize.

![]()

**Thông tin chi tiết**

*   Request context
*   Role & Permission được match
*   Scope / Attribute được evaluate
*   Policy rule áp dụng
*   Final decision
*   Deny reason (nếu có)

**Ví dụ**

Decision: DENY

Reason: Missing scope faculty=IT

Matched role: TEACHER

Matched permission: VIEW\_STUDENT

**Giải thích chi tiết màn hình**

**1️⃣ Log Context (Header – Readonly)**

*   Timestamp (UTC)
*   Decision: **ALLOW / DENY** (màu hoá)
*   Correlation ID
*   Tenant
*   Source (UI / API / Batch)
*   IP / Channel

**2️⃣ Actor Context (Who)**

*   User ID / Username
*   Roles tại thời điểm evaluate
*   User status
*   Session / Token type (minh hoạ)

**3️⃣ Request Context (What)**

*   Resource
*   Action
*   HTTP method (nếu API)
*   Endpoint / Feature key

**4️⃣ RBAC Evaluation**

*   Roles được xét
*   Permission match / not match
*   Kết quả RBAC step:
    *   ✅ PASS
    *   ❌ FAIL (kèm lý do)

**5️⃣ ABAC / Scope Evaluation**

*   Attributes đầu vào (department, campus, …)
*   Scope yêu cầu
*   Scope user có (Direct / Inherited)
*   Kết quả so khớp:
    *   ✅ Match
    *   ❌ Missing / Mismatch

📌 Đây là **phần cốt lõi giải thích DENY**

**6️⃣ Final Decision Reasoning**

*   Decision: **ALLOW / DENY**
*   Decision reason (human‑readable)
*   Rule / Policy ID áp dụng
*   Priority / Effect (nếu có)

**Ví dụ**

DENY because:

\- Permission VIEW\_STUDENT is granted

\- BUT missing required scope department=IT

**7️⃣ Audit Awareness**

*   Gợi ý audit action: VIEW\_AUTHORIZATION\_LOG\_DETAIL
*   Audit fields:
    *   actor\_user\_id
    *   viewed\_log\_correlation\_id
    *   tenant\_id
    *   timestamp

#### 4️⃣ Màn hình: Phân tích ALLOW / DENY (chỉ xem)

**![]()**

**Mô tả**
Hiển thị thống kê tổng quan nhằm hỗ trợ vận hành & kiểm toán.

![]()

**Ví dụ thống kê**

*   Top resource bị DENY
*   User có nhiều DENY nhất
*   Thời điểm DENY tăng đột biến
*   Scope thường gây DENY

📌 Không bao gồm chức năng chỉnh policy.

**Giải thích chi tiết thông tin Màn hình:**

**1️⃣ Bộ lọc phân tích (Time‑based, đa chiều)**

*   Time range (UTC)
*   Tenant
*   Resource / Action
*   Role
*   Scope / Attribute
*   Source (UI / API / Batch)

✅ Hỗ trợ **slice & dice dữ liệu** phục vụ audit và phân tích nguyên nhân

**2️⃣ KPI Summary (Quick Insight)**

*   Tổng số request
*   % **ALLOW** / % **DENY**
*   ⚠️ DENY spike (so với baseline)
*   👤 Số user bị DENY

**3️⃣ Biểu đồ phân tích (Visualization)**

*   📊 ALLOW vs DENY theo thời gian
*   📊 Top Resource bị DENY
*   📊 Top Scope gây DENY
*   📊 Top Role / User có DENY cao

📌 Biểu đồ mang tính diagnostic, không realtime, không auto‑decision

**4️⃣ Bảng phân tích chi tiết**

*   Resource
*   Action
*   ALLOW count
*   DENY count
*   DENY ratio
*   Gợi ý nguyên nhân (heuristic, explainable)

➡️ Click 1 dòng → drill‑down sang Authorization Log List (filter sẵn)

**5️⃣ Insight & Recommendation (Read‑only)**

Ví dụ:

*   “75% DENY do thiếu scope campus=HN”
*   “DENY tăng mạnh sau khi disable Scope DEPT\_IT”
*   “Role TEACHER\_DAV có DENY ratio cao bất thường”

📌 Chỉ là gợi ý nghiệp vụ, không auto‑remediation

**6️⃣ Audit Awareness**

*   Audit action: VIEW\_AUTHORIZATION\_ANALYTICS
*   Audit fields bắt buộc:
    *   actor\_user\_id
    *   tenant\_id
    *   time\_range
    *   filter\_conditions
    *   correlation\_id

### 4.5.7. Luồng xử lý nghiệp vụ (Business Flow)

User Request

→ IAM Authorization Engine

→ Evaluate RBAC

→ Evaluate ABAC (Scope / Attribute)

→ Decision (ALLOW / DENY)

→ Write Authorization Log

→ Authorization Monitoring (Read-only)

### 4.5.8. Yêu cầu phân quyền & bảo mật

*   Chỉ user được authorize mới xem được log
*   Không cho phép:
    *   Sửa
    *   Xóa
    *   Ẩn log
*   Log phải được bảo vệ khỏi truy cập trái phép
*   Mask dữ liệu nhạy cảm (PII) nếu cần

### 4.5.9. Yêu cầu audit & logging

Mọi bản ghi Authorization Log phải có tối thiểu:

#

Trường

Mô tả

1

timestamp

Thời điểm evaluate

2

decision

ALLOW / DENY

3

actor\_user\_id

User thực hiện request

4

actor\_roles

Role tại thời điểm evaluate

5

resource

Tài nguyên

6

action

Hành động

7

scopes

Scope / Attribute được dùng

8

result\_reason

Lý do quyết định

9

tenant\_id

Tenant

10

ip\_address

Nguồn request

11

correlation\_id

Truy vết end‑to‑end

📌 Log là **append‑only**, thời gian lưu trữ theo chính sách bảo mật.

### 4.5.10. Yêu cầu phi chức năng

*   Truy vấn log phải:
    *   Không ảnh hưởng performance authorize
    *   Hỗ trợ pagination
*   Cho phép export (CSV / JSON) nếu được phân quyền
*   Đồng bộ thời gian theo UTC

## 4.6. Kiểm toán & Truy vết dữ liệu

### 4.6.1. Mô tả chung

Chức năng **Audit & Forensic** cung cấp khả năng **ghi nhận, lưu trữ, truy vấn và phân tích các sự kiện bảo mật và thay đổi quan trọng** trong hệ thống IAM nhằm phục vụ:

*   ✅ Tuân thủ kiểm toán (Compliance)
*   ✅ Điều tra sự cố bảo mật (Forensic Investigation)
*   ✅ Truy vết hành vi người dùng & hệ thống
*   ✅ Đảm bảo tính minh bạch và không chối bỏ (Non‑repudiation)

Audit & Forensic là **nền tảng bắt buộc** cho các hệ thống IAM cấp enterprise và **hoạt động độc lập với UI nghiệp vụ**.

📌 **Audit log là append‑only, immutable, không được sửa hoặc xóa bằng UI**.

FE-Admin IAM chỉ cung cấp khả năng **xem và phân tích audit / forensic theo phân quyền**.

Các chức năng điều tra sự cố bảo mật chuyên sâu và vận hành SOC thuộc phạm vi **SOC Console (fe‑internal)** và không nằm trong nghiệp vụ quản trị IAM thông thường

### 4.6.2. Đối tượng sử dụng

#

Vai trò

Quyền

1

SUPER\_ADMIN

Xem toàn bộ audit log (cross‑tenant)

2

TENANT\_ADMIN

Xem audit log trong tenant

3

IAM\_SECURITY / IAM\_AUDITOR

Xem, lọc, phân tích forensic

4

IAM\_OPERATOR

Xem audit giới hạn theo phạm vi nghiệp vụ

5

Vai trò khác

Không được truy cập

### 4.6.3. Phạm vi Audit

Audit & Forensic bao phủ các nhóm sự kiện sau:

#### a) Identity & Access

*   Tạo / sửa / khóa / mở User
*   Gán / thu hồi Role
*   Thay đổi Scope / Attribute
*   Thay đổi trạng thái User / Role / Scope

#### b) Authorization

*   Quyết định ALLOW / DENY (tham chiếu 3.5)
*   Truy cập trái phép (DENY bất thường)
*   Override / bypass (nếu có)

#### c) Configuration & Policy

*   Tạo / sửa / xóa Role
*   Tạo / sửa / disable Scope
*   Thay đổi Policy RBAC / ABAC
*   Thay đổi rule ưu tiên

#### d) System & Security

*   Thay đổi cấu hình IAM
*   Thay đổi integration / client
*   Thao tác admin nhạy cảm

### 4.6.4. Nguyên tắc Audit

Audit & Forensic phải tuân thủ các nguyên tắc sau:

1.  **Append‑only** – không chỉnh sửa, không xóa
2.  **Timestamp chính xác (UTC)**
3.  **Định danh rõ ràng actor**
4.  **Gắn correlation\_id để trace end‑to‑end**
5.  **Phân tách audit data với dữ liệu nghiệp vụ**
6.  **Chống chối bỏ (non‑repudiation)**

### 4.6.5. Mô hình Audit Event

Mỗi Audit Event phải có tối thiểu các trường:

#

Trường

Mô tả

1

event\_id

ID duy nhất

2

timestamp

Thời điểm xảy ra (UTC)

3

event\_type

Loại sự kiện

4

action

Hành động (CREATE / UPDATE / DELETE / VIEW / AUTHORIZE…)

5

actor\_user\_id

User thực hiện

6

actor\_roles

Role tại thời điểm

7

target\_type

User / Role / Scope / Policy / Resource

8

target\_id

Đối tượng bị tác động

9

tenant\_id

Tenant

10

result

SUCCESS / FAILURE

11

reason

Lý do (nếu FAILURE)

12

ip\_address

IP

13

channel

UI / API / Batch

14

correlation\_id

Truy vết xuyên hệ thống

📌 Có thể mở rộng thêm metadata tùy ngữ cảnh.

### 4.6.6. Đặc tả màn hình chức năng

#### Tự động: Ghi Audit Log tự động

**Mô tả**
Hệ thống tự động ghi audit log cho mọi hành động quan trọng.

**Đặc điểm**

*   Không phụ thuộc UI
*   Không thể bị disable bởi người dùng thường
*   Ghi log **trước và sau** thay đổi (nếu cần forensic)

#### 1️⃣ Màn hình: Xem danh sách Audit Log

**![]()**

#### 2️⃣ Màn hình: Xem chi tiết Audit Event

**![]()**

**A: Mô tả Màn hình Danh Sách Audit Log**
Cho phép truy vấn danh sách audit log theo nhiều tiêu chí.

**Filter / Search**

*   Thời gian (UTC)
*   Event type / Action
*   Actor (User / Role)
*   Target type / Target ID
*   Result (SUCCESS / FAILURE)
*   Tenant
*   Channel (UI / API / Batch)
*   Correlation ID

**Bảng Audit Log**

*   Timestamp
*   Event type
*   Action
*   Actor
*   Target
*   Result
*   Correlation ID

➡️ Click 1 dòng → **Audit Log Detail**

**Tiêu chí lọc**

*   Thời gian (from – to)
*   Actor
*   Action / Event type
*   Target type / target id
*   Tenant
*   Result (SUCCESS / FAILURE)
*   Correlation ID

📌 **Read‑only**

**A: Mô tả Màn hình Chi tiết Audit Log**
Xem đầy đủ ngữ cảnh của một audit event:

**Audit Log Detail (Chi tiết & Forensic)**

**Header – Snapshot**

*   Timestamp, Event type, Action
*   Result (SUCCESS / FAILURE)
*   Correlation ID, Tenant

**Actor Context**

*   User ID / Username
*   Roles tại thời điểm
*   IP / Channel / Client

**Target Context**

*   Target type (User / Role / Scope / Policy / Config)
*   Target ID
*   Before / After state (nếu có)

**Payload & Metadata**

*   Request payload (mask PII)
*   System metadata
*   Error / reason (nếu FAILURE)

**Forensic Trace**

*   Các event liên quan cùng correlation\_id
*   Link sang **Authorization Log (3.5)** và timeline trước/sau

**Thông tin hiển thị**

*   Actor context
*   Target context
*   Payload before / after (nếu có)
*   Result & reason
*   Metadata hệ thống

**Giải thích**

![]()

#### 3️⃣ Màn hình: Forensic Investigation

**![]()**

**Mô tả**
Màn hình này phục vụ điều tra sự cố bảo mật & kiểm toán nâng cao, giúp trả lời chính xác:

Ai – làm gì – khi nào – qua đâu – tác động gì – chuỗi sự kiện ra sao.

**![]()**

**Khả năng**

*   Truy vết theo correlation\_id
*   Xem timeline sự kiện
*   Kết hợp audit + authorization log
*   Xác định “ai – làm gì – khi nào – vì sao”

📌 Không cho phép chỉnh sửa dữ liệu forensic.

**Giải thích chi tiết thông tin Màn hình**

**1️⃣ Forensic Search / Entry Point**

*   Correlation ID (bắt buộc)
*   Hoặc:
    *   User ID
    *   Time range
    *   Resource / Action
    *   Tenant

**➡️ Mục tiêu: xác định “case điều tra”**

**2️⃣ Forensic Case Summary**

*   Case ID (generated)
*   Trigger (DENY spike / manual search)
*   Time window
*   User(s) liên quan
*   Tenant
*   Severity (Low / Medium / High – heuristic)

**3️⃣ Correlation Timeline (Trung tâm màn hình)**

**Timeline theo thời gian (UTC)** gồm:

*   🟦 Audit Events (3.6)
*   🟥 Authorization Decisions (3.5)
*   🟨 Config / Policy Changes
*   🟩 System Events

**➡️** Mỗi node click được → mở **Audit Detail hoặc Authorization Log Detail**

**4️⃣ Event Detail Panel (Contextual)**

Hiển thị chi tiết event đang chọn:

*   Actor
*   Action
*   Target
*   Result
*   Reason
*   Before / After (nếu có)
*   Link chéo sang:
    *   Authorization Log Detail
    *   Audit Log Detail

**5️⃣ Forensic Findings (Read‑only)**

Tổng hợp tự động:

*   Chuỗi hành vi đáng chú ý
*   Điểm bất thường
*   Event “root cause”
*   Event “blast radius”

📌 **Chỉ gợi ý**, không tự động kết luận pháp lý

**6️⃣ Audit Awareness**

Việc mở forensic case cũng được audit:

*   VIEW\_FORENSIC\_CASE
*   actor\_user\_id
*   case\_id
*   correlation\_ids
*   timestamp

### 4.6.7. Luồng nghiệp vụ (Business Flow)

User / System Action

→ IAM Service

→ Execute action

→ Generate Audit Event

→ Persist Audit Log (immutable)

→ Audit & Forensic (read-only)

### 4.6.8. Phân quyền & bảo mật

*   Chỉ role được cấp phép mới xem audit
*   Mask dữ liệu nhạy cảm (PII) nếu cần
*   Không cho export nếu chưa được phân quyền
*   Truy cập audit cũng phải được audit

### 4.6.9. Yêu cầu lưu trữ & tuân thủ

*   Thời gian lưu trữ:
    *   Tối thiểu: 1–5 năm (tùy quy định)
*   Không cho phép purge thủ công
*   Hỗ trợ archive / cold storage
*   Tuân thủ:
    *   ISO 27001
    *   SOC 2
    *   GDPR (nếu áp dụng)

### 4.6.10. Yêu cầu phi chức năng

*   Audit không làm ảnh hưởng performance nghiệp vụ
*   Truy vấn audit có pagination
*   Hỗ trợ export (CSV / JSON) nếu được phép
*   Đồng bộ timestamp UTC

## 4.7. Hệ thống & Bảo mật

### 4.7.1. Mô tả chung

Chức năng **System & Security** cung cấp tập hợp các khả năng nhằm:

*   ✅ Bảo vệ **tính toàn vẹn (Integrity)** của hệ thống IAM
*   ✅ Đảm bảo **tính sẵn sàng (Availability)** và **bảo mật (Confidentiality)**
*   ✅ Quản lý các **cấu hình hệ thống nhạy cảm**
*   ✅ Phát hiện và phản ứng với **sự kiện an ninh (Security Events)**

Đây là lớp chức năng **cấp nền tảng (foundation layer)**, hỗ trợ trực tiếp cho các module:

*   Identity & Access
*   Authorization
*   Audit & Forensic

📌 **System & Security không phục vụ nghiệp vụ người dùng cuối**, chỉ dành cho **IAM Admin / Security Team**.

FE-Admin IAM chỉ cho phép cấu hình các tham số hệ thống và bảo mật **được IAM Core Services và Security Platform expose**.

FE-Admin IAM không trực tiếp cấu hình cơ chế xác thực, password policy hoặc MFA của Identity Provider (Keycloak).

### 4.7.2. Đối tượng sử dụng

#

Vai trò

Quyền

1

SUPER\_ADMIN

Toàn quyền cấu hình system & security (cross‑tenant)

2

IAM\_SECURITY\_ADMIN

Cấu hình bảo mật, xem security event

3

TENANT\_ADMIN

Xem cấu hình, chỉnh sửa hạn chế theo tenant

4

IAM\_OPERATOR

Chỉ xem (read‑only)

5

Vai trò khác

Không được truy cập

### 4.7.3. Phạm vi chức năng System & Security

#### a) System Configuration

*   Cấu hình toàn cục IAM
*   Cấu hình theo tenant
*   Feature flags
*   Rate limit / throttling
*   Session & token policy

#### b) Security Configuration

*   Password / credential policy
*   MFA / step‑up authentication
*   IP allowlist / blocklist
*   Client / integration security
*   API security controls

#### c) Security Monitoring

*   Phát hiện hành vi bất thường
*   Theo dõi security events
*   Phát hiện brute force / abuse
*   Theo dõi health & integrity

### 4.7.4. Nguyên tắc bảo mật

System & Security phải tuân thủ các nguyên tắc sau:

1.  Security‑by‑design
2.  Least privilege
3.  Fail‑secure (deny by default)
4.  Defense‑in‑depth
5.  Audit‑everything
6.  Separation of duties

📌 Mọi thay đổi trong System & Security đều **phải được audit** (tham chiếu 3.6).

### 4.7.5. Mô hình System & Security Configuration

#### 4.7.5.1. Cấu hình hệ thống (System Config)

#

Nhóm

Ví dụ

1

Session

session\_timeout, idle\_timeout

2

Token

access\_token\_ttl, refresh\_token\_ttl

3

Feature

enable\_abac, enable\_mfa

4

Performance

rate\_limit\_per\_client

5

Tenant

max\_user\_per\_tenant

#### 4.7.5.2. Cấu hình bảo mật (Security Config)

#

Nhóm

Ví dụ

1

Password

min\_length, complexity, rotation

2

MFA

required, methods

3

Network

ip\_whitelist, ip\_blacklist

4

Client

allowed\_redirect\_uri

5

API

signing\_alg, key\_rotation

### 4.7.6. Đặc tả màn hình chức năng

#### 1️⃣ Màn hình: Quản lý cấu hình hệ thống

**Tab: Session & Token**

**![]()**

**Tab: Authentication & MFA**

**![]()**

**Tab: Authorization & Feature Flags**

**![]()**

**Tab: Network & API Security**

**![]()**

**Tab: System Limits**

**![]()**

**Detail: Chi tiết tham số**

**![]()**

**Mô tả**

*   Quản lý **cấu hình hệ thống IAM** ở mức **Global / Tenant**
*   Kiểm soát **các tham số nhạy cảm (security‑critical)**
*   Thể hiện rõ:
    *   Ai được chỉnh
    *   Chỉnh cái gì
    *   Ảnh hưởng ra sao
*   ✅ **Read‑only mặc định**, chỉ **Editable có kiểm soát**
*   ✅ **Audit‑aware by design**

Cho phép quản trị viên cấu hình các tham số hệ thống IAM.

![]()

**Đặc điểm**

*   Áp dụng theo scope: global / tenant
*   Có validate trước khi áp dụng
*   Có versioning (logical)
*   Có thể yêu cầu **approval** (ngoài scope MVP)

📌 Thay đổi cấu hình **có hiệu lực hệ thống**, cần kiểm soát chặt chẽ.

**Giải thích thông tin Màn hình:**

**1️⃣ Configuration Scope Selector**

*   Scope: **Global / Tenant**
*   Tenant selector (khi chọn Tenant scope)
*   Environment: Prod / Staging (nếu có)

**2️⃣ Configuration Categories (Tab‑based)**

*   **Session & Token**
    *   session\_timeout
    *   access\_token\_ttl
    *   refresh\_token\_ttl
*   **Authentication & MFA**
    *   password\_policy
    *   mfa\_required
*   **Authorization & Feature Flags**
    *   enable\_abac
    *   enable\_fine\_grained\_scope
*   **Network & API Security**
    *   ip\_allowlist / ip\_blocklist
    *   rate\_limit
*   **System Limits**
    *   max\_user\_per\_tenant
    *   max\_role\_per\_user

📌 Dùng tab để **giảm rủi ro chỉnh nhầm config**

**3️⃣ Configuration Table (Key – Value)**

*   Config key
*   Current value
*   Default value
*   Scope (Global / Tenant)
*   Status (Active / Pending)
*   Last updated / Updated by

➡️ Một số config:

*   🔒 **Read‑only**
*   ✏️ **Editable có kiểm soát**

**4️⃣ Change Preview (Before / After)**

*   So sánh **giá trị cũ / mới**
*   Hiển thị **impact warning**
    *   Ví dụ: ảnh hưởng login, token, session
*   Validation result (pass / fail)

📌 **Bắt buộc preview trước khi Apply**

**5️⃣ Apply & Control**

*   ✅ Apply change
*   ↩️ Discard / Reset
*   🚫 (Out of MVP): Approval flow (4‑eyes)

**6️⃣ Audit Awareness (Inline)**

Mỗi thay đổi sinh **Audit Event**:

*   SYSTEM\_CONFIG\_UPDATE
*   actor\_user\_id
*   config\_key
*   before / after
*   scope, tenant\_id
*   correlation\_id

📌 Có link sang **Audit Log Detail (3.6)**

#### 2️⃣ Màn hình: Quản lý chính sách bảo mật

**Màn hình danh sách**

**![]()**

**Màn hình Chi tiết Sự kiện**

**![]()**

**Mô tả**
Cấu hình các chính sách liên quan đến xác thực và bảo vệ truy cập.

*   Giám sát **Security Events** trong hệ thống IAM
*   Phát hiện & theo dõi **Alert / Incident**
*   Phục vụ **SOC / Security Team / IAM Admin**
*   ✅ **Read‑only + controlled state change**
*   ❌ Không auto‑remediation, không rollback cấu hình

![]()

**Bao gồm**

*   Password policy
*   MFA policy
*   Token & session policy
*   Client security policy

📌 Thay đổi chính sách bảo mật có thể ảnh hưởng trực tiếp tới người dùng.

**Giải thích thông tin Màn hình Danh sách**

**1️⃣ Security Event Filters (SOC‑style)**

*   Time range (UTC)
*   Category:
    *   Authentication
    *   Authorization
    *   Configuration
    *   Network
*   Severity: Low / Medium / High / Critical
*   Status: Open / Acknowledged / Closed
*   Actor (User / System)
*   Tenant
*   Correlation ID

✅ Cho phép **slice & investigate nhanh**

**2️⃣ Security KPI / Summary**

*   Tổng số security events
*   Số **High / Critical**
*   Event đang **Open**
*   Phân bố theo category

📌 Phục vụ situational awareness cho SOC

**3️⃣ Security Events List (Core)**

**Bảng danh sách**

*   Timestamp (UTC)
*   Event type
*   Category
*   Severity
*   Actor / Source / IP
*   Target
*   Status
*   Correlation ID

➡️ Click 1 dòng → Security Event Detail

**Giải thích thông tin Màn hình Chi tiết sự kiện**

**4️⃣ Security Event Detail (Context Panel)**

*   Event metadata & lý do đánh giá severity
*   Actor / IP / Client
*   Resource / Config bị ảnh hưởng
*   Link chéo:
    *   **Audit Log Detail (3.6)**
    *   **Authorization Log Detail (3.5)**
    *   **Forensic Timeline (3.6)**

📌 Explainable – phục vụ điều tra & kiểm toán

**5️⃣ Alert Handling (Controlled)**

*   ✅ Acknowledge alert
*   ✅ Add comment / note
*   ✅ Change status:
    *   Open → Acknowledged → Closed

📌 Không có hành động phá vỡ hệ thống

**6️⃣ Audit Awareness**

Mọi thao tác đều sinh Audit:

*   VIEW\_SECURITY\_EVENT
*   ACK\_SECURITY\_EVENT
*   CLOSE\_SECURITY\_EVENT

Audit fields:

*   actor\_user\_id
*   event\_id
*   status\_before / status\_after
*   tenant\_id
*   correlation\_id

#### 3️⃣ Màn hình: Theo dõi & xử lý Security Event

**![]()**

**Mô tả**
Hệ thống tự động ghi nhận và hiển thị các sự kiện an ninh.

*   **Theo dõi liên tục** các Security Event trong IAM
*   **Phân loại – đánh giá – xử lý trạng thái** sự kiện an ninh
*   Phục vụ **SOC / Security Team / IAM Admin**
*   ✅ Read‑only dữ liệu gốc
*   ✅ Cho phép **xử lý trạng thái** (Ack / Close / Re‑open)
*   ❌ Không remediation, không block user, không rollback config

**Ví dụ Security Event**

*   Login failure liên tiếp
*   Brute force detection
*   Access từ IP bất thường
*   Thay đổi config nhạy cảm
*   Token misuse

📌 Security Event **không đồng nghĩa với Audit Event**, nhưng **liên kết chặt chẽ**.

**Giải thích thông tin trên Màn hình**

**1️⃣ Bộ lọc theo dõi Security Event**

*   Thời gian (UTC)
*   Nhóm sự kiện:
    *   Xác thực (Authentication)
    *   Phân quyền (Authorization)
    *   Cấu hình (Configuration)
    *   Mạng (Network)
*   Mức độ nghiêm trọng:
    *   Low / Medium / High / Critical
*   Trạng thái xử lý:
    *   Open / Acknowledged / Closed
*   Actor (User / System)
*   Tenant
*   Correlation ID

➡️ Hỗ trợ **lọc nhanh – điều tra sự cố**

**2️⃣ Tổng quan tình trạng an ninh (Security Overview)**

*   Tổng số security event
*   Số event **High / Critical**
*   Số event đang **Open**
*   Số tenant bị ảnh hưởng

➡️ **Situational awareness** cho SOC

**3️⃣ Danh sách Security Event**

**Bảng theo dõi chính**

*   Thời điểm (UTC)
*   Loại & nhóm sự kiện
*   Severity
*   Actor / IP / nguồn
*   Đối tượng bị ảnh hưởng
*   Trạng thái xử lý
*   Correlation ID

➡️ Click 1 dòng → **Chi tiết Security Event**

**4️⃣ Chi tiết Security Event**

*   Metadata đầy đủ
*   Severity & lý do đánh giá
*   Actor / IP / Client
*   Resource / Config bị tác động
*   Correlation ID
*   Gợi ý điều tra

🔗 Liên kết chéo:

*   **Audit Log Detail (3.6)**
*   **Authorization Log Detail (3.5)**
*   **Forensic Timeline (3.6)**

**5️⃣ Xử lý Security Event (Controlled)**

*   ✅ Acknowledge (đã tiếp nhận)
*   ✅ Close (đã xử lý)
*   ✅ Re‑open (mở lại)

📌 **Chỉ thay đổi trạng thái xử lý**, không thay đổi hệ thống

**6️⃣ Audit Awareness**

Mọi thao tác đều sinh Audit Event:

*   VIEW\_SECURITY\_EVENT
*   ACK\_SECURITY\_EVENT
*   CLOSE\_SECURITY\_EVENT

Audit ghi:

*   actor\_user\_id
*   security\_event\_id
*   status\_before / status\_after
*   tenant\_id
*   correlation\_id
*   timestamp

#### 4️⃣ Màn hình: Health & Integrity Monitoring

**Màn hình Dashboard Console**

**![]()**

**Màn hình Chi tiết Component**

**![]()**

**![]()**

**Mô tả**
Theo dõi trạng thái hoạt động của IAM.

*   Giám sát **tình trạng sức khỏe (Health)** của IAM platform
*   Theo dõi **tính toàn vẹn (Integrity)** của:
    *   Audit log
    *   Security event stream
    *   Policy & configuration
*   Phát hiện **tampering / degradation / silent failure**
*   Phục vụ **SOC / Security / Platform Ops**

✅ Read‑only
✅ Near‑real‑time
✅ Audit‑aware
❌ Không remediation trực tiếp

**Giải thích thông tin trên Màn hình**

**1️⃣ System Health Overview**

*   IAM Core status (Up / Degraded / Down)
*   Auth service
*   Policy engine
*   Audit pipeline
*   Event ingestion

➡️ Đèn trạng thái + last heartbeat

**2️⃣ Integrity Checks**

*   ✅ Audit log immutability
*   ✅ Event sequence continuity
*   ✅ Config checksum
*   ✅ Policy version consistency

**➡️ Detect:**

*   Missing logs
*   Re‑write / truncate
*   Out‑of‑order events

**3️⃣ Metrics & Signals**

*   Event ingestion rate
*   Audit log lag
*   Failed auth spike
*   Policy reload count
*   Error rate

**➡️ Phục vụ early warning**

**4️⃣ Health Incidents (Derived)**

*   Integrity violation detected
*   Audit pipeline stalled
*   Clock skew / time drift
*   Unexpected restart

**➡️ Click → điều tra forensic (3.6)**

**5️⃣ Audit Awareness**

Mọi tín hiệu đều gắn:

*   HEALTH\_CHECK\_EVENT
*   INTEGRITY\_ALERT
*   component
*   severity
*   correlation\_id

#### 5\. Màn hình Dashboard Tổng quan (Security Dashboard)

**Mô tả:** Màn hình đầu tiên (Landing page) của hệ thống Admin, cung cấp cái nhìn toàn cảnh về sức khỏe và an ninh hệ thống.

**Các thành phần chính (Widgets):**

1.  **Thẻ chỉ số (Stats Cards):**
    *   Tổng số User / User mới trong tuần.
    *   Số Tenant đang hoạt động.
    *   Lưu lượng Request xác thực (Req/min).
    *   Số cảnh báo bảo mật (High Severity Alerts).
2.  **Biểu đồ (Charts):**
    *   Biểu đồ cột: Lưu lượng đăng nhập trong 7 ngày qua.
    *   Biểu đồ thanh ngang: System Health (API Latency, Error Rate).
3.  **Nhật ký rút gọn:** Danh sách 5-10 hành động Audit Log gần nhất.

### 4.7.7. Luồng nghiệp vụ (Business Flow)

Admin / System Event

→ IAM Core

→ Validate security constraints

→ Apply config / detect event

→ Generate Audit Log (3.6)

→ Generate Security Event (nếu có)

→ System & Security UI (read‑only / controlled edit)

### 4.7.8. Phân quyền & kiểm soát truy cập

*   Chỉ role đặc thù được chỉnh cấu hình
*   Có thể áp dụng:
    *   Dual control (4‑eyes principle)
    *   Approval workflow
*   Thao tác cấu hình bị hạn chế theo tenant

### 4.7.9. Audit & Logging

Mọi hành động trong System & Security phải được audit với:

*   action: SYSTEM\_CONFIG\_UPDATE, SECURITY\_POLICY\_UPDATE, SECURITY\_EVENT\_DETECTED
*   actor\_user\_id
*   target\_config
*   before / after value
*   tenant\_id
*   correlation\_id

📌 Tham chiếu chi tiết tại **3.6 – Audit & Forensic**.

### 4.7.10. Yêu cầu phi chức năng

*   Thay đổi config **không làm downtime**
*   Có rollback logic (nếu khả thi)
*   Không ảnh hưởng authorize realtime
*   UI phản hồi rõ ràng về impact
*   Tất cả timestamp dùng UTC

### 4.7.11. Tuân thủ & tiêu chuẩn

System & Security phải hỗ trợ tuân thủ:

*   ISO 27001
*   SOC 2
*   OWASP ASVS
*   OWASP Top 10
*   GDPR (nếu áp dụng)

# 5\. Yêu cầu Phi chức năng & Giao diện & Dữ liệu

## 5.1. Yêu cầu Kiến trúc & Triển khai

### 5.1.1. NFR‑ARCH‑01 – SaaS Multi‑Tenant Architecture

*   Hệ thống IAM phải được thiết kế theo mô hình **SaaS multi‑tenant**.
*   Mỗi tenant phải được **cách ly logic hoàn toàn** về:
    *   Dữ liệu
    *   Cấu hình
    *   Chính sách phân quyền

**Điều kiện nghiệm thu:**

*   Không tồn tại truy vấn hoặc API cho phép truy cập cross‑tenant.
*   Tenant context bắt buộc trong mọi request.

### 5.1.2. NFR‑ARCH‑02 – Microservice & Stateless

*   IAM Platform phải được triển khai dưới dạng **microservice độc lập**.
*   Các service phải không trạng thái **stateless**, không lưu session trong bộ nhớ cục bộ.

### 5.1.3. NFR‑ARCH‑03 – Cloud‑Native & Containerized

*   Hệ thống phải:
    *   Chạy được trên môi trường container (Docker/Kubernetes)
    *   Hỗ trợ scale ngang (horizontal scaling)
    *   Không phụ thuộc hạ tầng vật lý cụ thể

## 5.2. Yêu cầu bảo mật (Security Requirements)

### 5.2.1. NFR‑SEC‑01 – Zero Trust Enforcement

*   Mọi request phải:
    *   Được xác thực
    *   Được phân quyền
    *   Được đánh giá policy tại thời điểm chạy (runtime)
*   Không có endpoint “trusted by default”.

### 5.2.2. NFR‑SEC‑02 – Token Security

*   JWT phải:
    *   Ký bằng thuật toán mạnh (RS256 hoặc tương đương)
    *   Có thời hạn ngắn (short‑lived access token)
*   Refresh token phải:
    *   Được bảo vệ
    *   Có khả năng thu hồi

### 5.2.3. NFR‑SEC‑03 – Tenant Isolation

*   Token phải chứa **tenant\_id**.
*   Authorization phải kiểm tra tenant trước mọi quyết định.

**Điều kiện nghiệm thu:**

*   Token tenant A không thể truy cập resource tenant B.

### 5.2.4. NFR‑SEC‑04 – Least Privilege

*   User, service account chỉ được cấp quyền tối thiểu cần thiết.
*   Không tồn tại quyền mặc định “admin all”.

### 5.2.5. NFR‑SEC‑05 – Compliance & Standards

*   Hệ thống phải tuân thủ:
    *   OWASP ASVS
    *   OWASP Top 10
    *   ISO/IEC 27001 (mức logical control)
    *   Nguyên tắc bảo vệ dữ liệu cá nhân (GDPR‑like)

## 5.3. Yêu cầu Hiệu năng

### 5.3.1. NFR‑PERF‑01 – Authentication Performance

*   Thời gian xử lý login:
    *   ≤ 500 ms (p95)
    *   ≤ 800 ms (p99)

### 5.3.2. NFR‑PERF‑02 – Authorization Performance

*   Thời gian kiểm tra quyền:
    *   ≤ 50 ms (p95)
*   Không làm chậm nghiệp vụ backend.

### 5.3.3. NFR‑PERF‑03 – Scalability

*   Hệ thống phải hỗ trợ:
    *   ≥ 100 tenants
    *   ≥ 100.000 users
    *   ≥ 1.000 requests/second (authz)

## 5.4. Yêu cầu Tính sẵn sàng & Độ tin cậy

### 5.4.1. NFR‑AVAIL‑01 – Availability

*   IAM Platform phải đạt:
    *   ≥ 99.9% uptime (monthly)

### 5.4.2. NFR‑AVAIL‑02 – Fault Tolerance

*   Lỗi của một tenant:
    *   Không ảnh hưởng tenant khác
*   Hỗ trợ retry, circuit breaker tại API Gateway/BFF.

### 5.4.3. NFR‑AVAIL‑03 – Disaster Recovery

*   Có cơ chế:
    *   Backup dữ liệu định kỳ
    *   Khôi phục dữ liệu theo tenant

## 5.5. Yêu cầu Logging, Audit & Giám sát

### 5.5.1. NFR‑LOG‑01 – Audit Log Integrity

*   Audit log:
    *   Không được chỉnh sửa
    *   Gắn tenant context
    *   Có timestamp & actor

### 5.5.2. NFR‑LOG‑02 – Retention Policy

*   Audit log phải được lưu tối thiểu:
    *   12 tháng (mặc định)
    *   Có thể cấu hình theo tenant

### 5.5.3. NFR‑LOG‑03 – Monitoring & Alerting

*   Hệ thống phải:
    *   Giám sát lỗi auth/authz
    *   Cảnh báo bất thường bảo mật
    *   Theo dõi theo tenant

## 5.6. Yêu cầu khả năng Mở rộng & Cấu hình

### 5.6.1. NFR‑EXT‑01 – Tenant‑Configurable Policies

*   Mỗi tenant có thể cấu hình:
    *   MFA
    *   Password policy
    *   Authorization policy
*   Không cần deploy lại hệ thống.

### 5.6.2. NFR‑EXT‑02 – IdP Federation

*   Hệ thống phải hỗ trợ:
    *   IdP mặc định
    *   IdP riêng cho từng tenant

## 5.7. Yêu cầu khả năng bảo trì & vận hành

### 5.7.3. NFR‑OPS‑01 – Observability

*   Hệ thống phải cung cấp:
    *   Centralized logging
    *   Metrics (CPU, memory, latency)
    *   Tracing cho auth flow

### 5.7.3. NFR‑OPS‑02 – Configuration Management

*   Cấu hình phải:
    *   Tách khỏi source code
    *   Quản lý theo environment & tenant

## 5.8. Yêu cầu Pháp lý & Dữ liệu

### 5.8.1. NFR‑LEGAL‑01 – Data Ownership

*   Mỗi tenant là **chủ sở hữu dữ liệu** của mình.
*   Nhà cung cấp SaaS không sử dụng dữ liệu cho mục đích khác.

### 5.8.2. NFR‑LEGAL‑02 – Data Residency

*   Hệ thống có khả năng:
    *   Triển khai theo vùng địa lý
    *   Phù hợp yêu cầu pháp luật địa phương

## 5.9. Yêu cầu Giao diện UI & Dữ liệu

### 5.9.1. Giao diện người dùng (User Interface Requirements)

#### 5.9.1.1. FE‑Admin IAM – SaaS Admin Console

FE‑Admin IAM là ứng dụng web dùng cho quản trị IAM, phải đáp ứng:

*   Truy cập qua trình duyệt web hiện đại (Chrome, Edge, Firefox)
*   Hỗ trợ các nhóm người dùng:
    *   **Super Admin (SaaS)**
    *   **Tenant Admin**
*   Giao diện **tenant‑aware** (luôn hiển thị tenant context)

**Yêu cầu chính:**

*   Quản lý tenant (đối với Super Admin)
*   Quản lý user, role, policy (theo tenant)
*   Cấu hình IdP, MFA, security policy
*   Xem audit log & authorization log theo tenant

#### 5.9.1.2. Nguyên tắc UI/UX

*   Không cho phép thao tác nhầm tenant
*   Hiển thị rõ vai trò và phạm vi quyền
*   Tuân thủ:
    *   Responsive design
    *   Accessibility cơ bản (WCAG 2.1 – level A/AA)

### 5.9.2. Giao diện phần mềm (Software Interfaces)

#### 5.9.2.1. Giao tiếp với Identity Provider (IdP)

IAM Platform phải tích hợp với IdP thông qua:

*   **OIDC / OAuth 2.0**
*   **SAML 2.0** (tuỳ chọn)

**Yêu cầu:**

*   Hỗ trợ **IdP per tenant**
*   Có thể cấu hình:
    *   Client ID
    *   Redirect URI
    *   Claims mapping

#### 5.9.2.2. Giao tiếp với API Gateway / BFF

IAM phải cung cấp và/hoặc tích hợp các API cho:

*   Token validation
*   Authorization decision
*   User context resolution

**Nguyên tắc:**

*   RESTful API
*   JSON format
*   TLS bắt buộc (HTTPS)

#### 5.9.2.3. Tích hợp với các Microservice SAE

Các microservice SAE phải:

*   Nhận JWT từ IAM
*   Gửi request authorization tới IAM/PDP
*   Không tự implement logic phân quyền

### 5.9.3. Giao diện giao tiếp (Communication Interfaces)

*   Giao thức: **HTTPS**
*   Encoding: **UTF‑8**
*   Chuẩn dữ liệu: **JSON**
*   Time synchronization: **UTC**

### 5.9.4. Yêu cầu Dữ liệu tổng thể (Data Requirements Overview)

IAM Platform quản lý các nhóm dữ liệu sau:

*   Tenant data
*   Identity data (User)
*   Authorization data (Role, Permission, Policy)
*   Security data (Token, Session)
*   Audit & log data

Mọi dữ liệu phải được:

*   Gắn **tenant\_id**
*   Cách ly logic giữa các tenant

### 5.9.5. Mô hình dữ liệu chính (Core Data Entities)

#### 5.9.5.1. Tenant

**#**

**Thuộc tính**

**Mô tả**

**1**

tenant\_id

Định danh duy nhất

**2**

tenant\_code

Mã tenant

**3**

tenant\_name

Tên Trường/Đơn vị

**4**

status

Active / Inactive

**5**

config

Cấu hình IAM

#### 5.9.5.2. User

**#**

**Thuộc tính**

**Mô tả**

**1**

user\_id

Định danh người dùng

**2**

tenant\_id

Tenant sở hữu

**3**

username

Tên đăng nhập

**4**

attributes

Thuộc tính động

**5**

status

Active / Locked

#### 5.9.5.3. Role

**#**

**Thuộc tính**

**Mô tả**

**1**

role\_id

Định danh role

**2**

tenant\_id

Tenant

**3**

role\_name

Tên role

**4**

permissions

Danh sách quyền

#### 5.9.5.4. Policy

**#**

**Thuộc tính**

**Mô tả**

**1**

policy\_id

Định danh policy

**2**

tenant\_id

Tenant

**3**

rule

Logic RBAC/ABAC

**4**

effect

Allow / Deny

#### 5.9.5.5. Token & Session

**#**

**Thuộc tính**

**Mô tả**

**1**

token\_id

Định danh token

**2**

tenant\_id

Tenant

**3**

user\_id

User

**4**

expiry

Thời hạn

**5**

status

Valid / Revoked

### 5.9.6. Yêu cầu toàn vẹn & chất lượng dữ liệu

*   Mọi entity bắt buộc có tenant\_id
*   Không cho phép:
    *   Foreign key cross‑tenant
    *   Truy vấn không filter tenant
*   Dữ liệu audit **append‑only**

### 5.9.7. Yêu cầu lưu trữ & vòng đời dữ liệu

*   User & authorization data:
    *   Lưu theo vòng đời tenant
*   Audit & log:
    *   Lưu tối thiểu 12 tháng
    *   Có thể cấu hình theo tenant
*   Token:
    *   Tự động hết hạn
    *   Có thể bị thu hồi chủ động

### 5.9.8. Yêu cầu bảo vệ dữ liệu

*   Mã hóa dữ liệu nhạy cảm (at‑rest & in‑transit)
*   Không lưu plaintext credential
*   Hỗ trợ:
    *   Data masking (UI)
    *   Logical data separation

# 6\. Yêu cầu Tích hợp & API

## 6.1. Nguyên tắc tích hợp (Integration Principles)

*   Mọi tích hợp đều:
    *   Qua **HTTPS**
    *   Sử dụng **JSON**
    *   Bắt buộc **Authentication & Authorization**
*   Mọi API:
    *   **Tenant‑aware**
    *   Không cho phép truy cập cross‑tenant
*   IAM **là nguồn sự thật duy nhất** về:
    *   Identity
    *   Role
    *   Permission
    *   Authorization decision

## 6.2. Chuẩn bảo mật API (API Security Standards)

*   Chuẩn xác thực: **OAuth 2.0 / OIDC**
*   Token: **JWT (RS256)**
*   Header bắt buộc:
*   Authorization: Bearer <access\_token>
*   X-Tenant-Id: <tenant\_id>
*   API từ chối request nếu:
    *   Thiếu token
    *   Token hết hạn / bị thu hồi
    *   Tenant mismatch

## 6.3. Tích hợp với Identity Provider (IdP Integration)

### 6.3.1. OIDC Endpoints (per Tenant)

**#**

**Endpoint**

**Mô tả**

**1**

/authorize

Login & consent

**2**

/token

Cấp token

**3**

/userinfo

Lấy thông tin user

**4**

/logout

Logout

**Yêu cầu:**

*   Mỗi tenant có thể:
    *   Dùng IdP mặc định
    *   Hoặc cấu hình IdP riêng

### 6.3.2. Claims Mapping

JWT phải chứa tối thiểu:

{

"sub": "user\_id",

"tenant\_id": "tenant\_001",

"roles": \["STUDENT", "LECTURER"\],

"scopes": \["sae.read", "sae.write"\],

"exp": 1700000000

}

### 6.4. Core IAM APIs (OpenAPI‑Level)

### 6.4.1. Authentication APIs

**POST /api/auth/login**

*   **Mô tả**: Đăng nhập theo tenant
*   **Request**

{

"tenant\_code": "uni\_a",

"username": "user01",

"password": "\*\*\*\*\*\*\*\*"

}

*   **Response 200**

{

"access\_token": "jwt...",

"refresh\_token": "jwt...",

"expires\_in": 900

}

**POST /api/auth/logout**

*   **Mô tả**: Logout & revoke token
*   **Response**: 204 No Content

### 6.4.2. Token & Session APIs

**POST /api/tokens/introspect**

*   **Mô tả**: Kiểm tra token hợp lệ
*   **Request**

{

"token": "jwt..."

}

*   **Response**

{

"active": true,

"tenant\_id": "tenant\_001",

"user\_id": "u123"

}

### 6.4.3. Authorization APIs (PDP)

**POST /api/authz/decision**

*   **Mô tả**: Kiểm tra quyền truy cập (PDP)
*   **Request**

{

"subject": {

"user\_id": "u123",

"roles": \["LECTURER"\]

},

"resource": {

"type": "activity",

"faculty": "IT"

},

"action": "APPROVE"

}

*   **Response**

{

"decision": "ALLOW",

"policy\_id": "policy\_456"

}

### 6.4.4. User & Identity APIs

**GET /api/users/{id}**

*   **Mô tả**: Lấy thông tin user (tenant‑scoped)
*   **Response**

{

"user\_id": "u123",

"tenant\_id": "tenant\_001",

"roles": \["STUDENT"\]

}

### 6.4.5. Tenant Management APIs

**POST /api/tenants**

*   **Quyền**: Super Admin
*   **Request**

{

"tenant\_code": "uni\_b",

"tenant\_name": "University B"

}

### 6.4.6. Audit & Log APIs

**GET /api/audit/logs**

*   **Query params**:
    *   from\_date
    *   to\_date
    *   action
*   **Tenant‑scoped**

## 6.5. Service Account & Machine‑to‑Machine (M2M)

### 6.5.1. Service Account Token

*   Cấp token theo:
    *   tenant
    *   scope
*   Không có quyền UI

### 6.5.2. Client Credentials Flow

*   IAM phải hỗ trợ:
    *   OAuth2 Client Credentials
    *   Token ngắn hạn
    *   Scope‑limited

## 6.6. Event‑Driven Integration (Optional)

IAM có thể phát sự kiện:

**#**

**Event**

**Mô tả**

**1**

USER\_CREATED

Tạo user

**2**

ROLE\_UPDATED

Cập nhật role

**3**

TOKEN\_REVOKED

Thu hồi token

**Giao thức**:

*   Kafka / Webhook (cấu hình)

## 6.7. API Versioning & Compatibility

*   API version theo URL:
*   /api/v1/...
*   Không breaking change trong cùng version
*   Deprecation phải có thông báo trước

## 6.8. Error Handling & Response Standards

**Error Response Format**

{

"error\_code": "AUTHZ\_DENIED",

"message": "Access denied",

"trace\_id": "abc-123"

}

**HTTP Status Codes**

**#**

**Code**

**Ý nghĩa**

**1**

401

Unauthorized

**2**

403

Forbidden

**3**

404

Not Found

**4**

429

Too Many Requests

**5**

500

Internal Error

# 7\. Yêu cầu Kiểm thử & Tiêu chí nghiệm thu

## 7.1. Mục tiêu kiểm thử (Testing Objectives)

Hoạt động kiểm thử nhằm đảm bảo rằng **IAM Platform SaaS**:

*   Đáp ứng đầy đủ yêu cầu **chức năng (FR)** và **phi chức năng (NFR)**
*   Vận hành đúng trong môi trường **multi‑tenant**
*   Tuân thủ mô hình **Zero Trust**
*   Đủ điều kiện **nghiệm thu, triển khai và vận hành thương mại**

## 7.2. Phạm vi kiểm thử (Testing Scope)

**Trong phạm vi**

*   IAM Platform (Core Services)
*   FE‑Admin IAM
*   API Gateway / BFF integration
*   Tích hợp IdP (OIDC/OAuth2)
*   Authorization (RBAC + ABAC)
*   Token, session, audit, logging

**Ngoài phạm vi**

*   Nghiệp vụ HĐNK / HĐCĐ / ĐRL
*   UI nghiệp vụ ngoài FE‑Admin IAM

## 7.3. Các mức kiểm thử (Test Levels)

**#**

**Mức kiểm thử**

**Mục tiêu**

**1**

Unit Test

Kiểm tra logic nội bộ service

**2**

Integration Test

Kiểm tra tích hợp IAM ↔ IdP ↔ BFF

**3**

System Test

Kiểm tra toàn hệ thống IAM

**4**

Security Test

Kiểm tra bảo mật, Zero Trust

**5**

UAT

Kiểm tra chấp nhận nghiệp vụ

**6**

Regression Test

Đảm bảo không phát sinh lỗi mới

## 7.4. Kịch bản Test theo nhóm yêu cầu

### 7.4.1. Tenant Management

**Kịch bản:** Tạo tenant mới

*   Super Admin tạo tenant A
*   Tạo user trong tenant A

✅ **Tiêu chí nghiệm thu**

*   Tenant A hoạt động độc lập
*   User tenant A không truy cập tenant B

### 7.4.2. Authentication

**Kịch bản:** Đăng nhập theo tenant

*   User chọn tenant đúng
*   User nhập sai tenant **Tiêu chí nghiệm thu**
*   Đúng tenant → login thành công
*   Sai tenant → từ chối đăng nhập

### 7.4.3. Authorization (RBAC + ABAC)

**Kịch bản:** Kiểm tra quyền theo role & attribute

✅ **Tiêu chí nghiệm thu**

*   Role không đủ → 403 Forbidden
*   Thuộc tính không match → Access Denied
*   Policy đúng → Access Allowed

### 7.4.4. Token & Session

**Kịch bản:** Logout & token revocation **Tiêu chí nghiệm thu**

*   Token bị revoke không dùng lại được
*   Session bị hủy ngay lập tức

### 7.4.5. Audit & Logging

**Kịch bản:** Thay đổi role user

✅ **Tiêu chí nghiệm thu**

*   Có audit log
*   Log gắn tenant & actor
*   Không cho sửa/xóa log

## 7.5. Các yêu cầu Kiểm thử bảo mật

### 7.5.1. Zero Trust Validation

*   Mọi API đều:
    *   Yêu cầu token
    *   Kiểm tra tenant
    *   Kiểm tra quyền

✅ **Tiêu chí Đạt**

*   Không có endpoint truy cập không xác thực

### 7.5.2. OWASP Testing

*   Test các rủi ro:
    *   Broken Access Control
    *   Token leakage
    *   Injection
    *   Misconfiguration

✅ **Tiêu chí Đạt**

*   Không có lỗi mức High/Critical

### 7.6. Performance & Load Testing

**#**

**Chỉ tiêu**

**Kết quả mong đợi**

**1**

Auth response (p95)

≤ 500 ms

**2**

AuthZ response (p95)

≤ 50 ms

**3**

Concurrent users

≥ 10.000

**4**

AuthZ TPS

≥ 1.000

✅ **Tiêu chí Đạt**

*   Đạt ≥ 95% chỉ tiêu

## 7.7. UAT –Tiêu chí nghiệm thu người dùng

**Điều kiện UAT**

*   Tất cả test case critical = PASS
*   Không còn lỗi Severity 1 & 2
*   Có đầy đủ tài liệu:
    *   SRS
    *   FRD
    *   SSD
    *   Test Report

**Tiêu chí nghiệm thu**

Hệ thống được nghiệm thu khi:

✅ Đáp ứng đầy đủ yêu cầu SRS Hoạt động đúng mô hình SaaS multi‑tenant
✅ Tuân thủ Zero Trust & bảo mật
✅ Được đại diện khách hàng xác nhận

## 7.8. Traceability Test Matrix (Tóm tắt)

**#**

**Requirement**

**Test Case**

**Kết quả**

**1**

FR‑TM‑01

TC‑TM‑01

PASS

**2**

FR‑AUTHN‑01

TC‑AUTHN‑01

PASS

**3**

FR‑AUTHZ‑02

TC‑AUTHZ‑05

PASS

**4**

NFR‑SEC‑03

TC‑SEC‑03

PASS

_(Chi tiết bảng Traceability sẽ nằm trong phụ lục hoặc file riêng)_

## 7.9. Điều kiện kết thúc Giai đoạn kiểm thử

Kiểm thử được xem là hoàn tất khi:

*   100% test case critical = PASS
*   Không còn lỗi High/Critical
*   Đạt chỉ tiêu bảo mật & hiệu năng
*   Được ký xác nhận nghiệm thu UAT

# 8\. Phụ Lục: Thông tin hỗ trợ khác

## 8.1. Glossary – Thuật ngữ & Định nghĩa

### 8.1.1. Thuật ngữ chung

**#**

**Thuật ngữ**

**Định nghĩa**

**1**

SAE

Student Activity Evaluation – Nền tảng SaaS quản lý hoạt động sinh viên

**2**

IAM

Identity & Access Management

**3**

SaaS

Software as a Service

**4**

Tenant

Đơn vị логic độc lập trong hệ thống SaaS (mỗi Trường/Đơn vị = 1 tenant)

**5**

Multi‑Tenant

Mô hình nhiều tenant dùng chung hạ tầng nhưng cách ly logic

**6**

Zero Trust

Mô hình bảo mật “không tin cậy mặc định”

**7**

IdP

Identity Provider

**8**

SSO

Single Sign‑On

**9**

MFA

Multi‑Factor Authentication

**10**

JWT

JSON Web Token

**11**

RBAC

Role‑Based Access Control

**12**

ABAC

Attribute‑Based Access Control

**13**

PDP

Policy Decision Point

**14**

BFF

Backend For Frontend

**15**

Service Account

Tài khoản hệ thống, không gắn người dùng

### 8.1.2. Thuật ngữ bảo mật & kỹ thuật

**#**

**Thuật ngữ**

**Định nghĩa**

**1**

Least Privilege

Nguyên tắc cấp quyền tối thiểu

**2**

Token Revocation

Thu hồi token trước khi hết hạn

**3**

Audit Log

Log phục vụ kiểm toán

**4**

Authorization Log

Log quyết định phân quyền

**5**

Claim

Thuộc tính trong JWT

**6**

Scope

Phạm vi quyền của token

**7**

Client Credentials Flow

OAuth2 flow cho machine‑to‑machine

## 8.2. Mô tả kiến trúc & luồng (Diagrams)

**_Lưu ý_**_: Sơ đồ chi tiết sẽ nằm trong_ **_SSD_**_. Phần này mô tả logic để tham chiếu_.

### 8.2.1. High‑Level SaaS IAM Architecture

**Mô tả:**

**![]()**

**Đặc điểm:**

*   Tenant context đi xuyên suốt
*   Không có trust implicit
*   Authorization quyết định tập trung

**Giải thích Sơ đồ:**

*   **Tenant Context**:
    *   Luôn đi kèm từ Client → Gateway → IAM → Microservice
*   **Zero Trust**:
    *   Không service nào tin request mặc định
    *   PDP quyết định quyền truy cập tập trung
*   **SaaS Multi‑Tenant**:
    *   IAM Database & Log Store cách ly logic theo tenant
*   **IdP linh hoạt**:
    *   Mỗi tenant có thể dùng IdP riêng hoặc IdP mặc định

### 8.2.2. Luồng xác thực người dùng (Authentication Flow (OIDC – SaaS))

![]()

**✅ Mô tả luồng (tóm tắt)**

1.  User chọn tenant
2.  Redirect tới IdP của tenant
3.  Authenticate thành công
4.  IAM phát JWT (tenant‑scoped)
5.  Token dùng cho mọi request tiếp theo

**✅ Giải thích theo Sơ đồ**

**Điểm nhấn SaaS & Multi‑Tenant**

*   User **bắt buộc chọn tenant** ngay từ đầu
*   IAM resolve **IdP theo tenant**
*   Token phát hành luôn chứa tenant\_id

**Zero Trust**

*   Gateway không tin token IdP ngay
*   Token phải được **IAM validate lại**
*   User/tenant status được kiểm tra realtime

**Security & Audit**

*   Hỗ trợ MFA tại IdP
*   Ghi **Audit Log** cho mọi lần đăng nhập
*   Có thể mở rộng:
    *   Token revocation
    *   Session limit

### 8.2.3. Luồng Phân quyền Người dùng (Authorization Flow (RBAC + ABAC))

![]()

**✅ Mô tả luồng (tóm tắt)**

1.  Request tới microservice
2.  BFF gọi PDP
3.  PDP đánh giá:
    *   Role
    *   Attribute
    *   Policy
4.  Trả quyết định ALLOW / DENY
5.  Ghi Authorization Log

**✅ Giải thích Sơ đồ**

#### 1\. RBAC + ABAC kết hợp

*   **RBAC**: kiểm tra role → permission
*   **ABAC**: kiểm tra thuộc tính:
    *   user (faculty, position…)
    *   resource (owner, faculty…)
    *   context (time, tenant…)

➡️ Quyết định cuối cùng **phải thỏa cả RBAC & ABAC**

#### 2\. PDP – Policy Decision Point

*   PDP:
    *   Độc lập với microservice
    *   Không chứa logic nghiệp vụ
    *   Là **nguồn quyết định duy nhất**

#### 3\. Multi‑Tenant & Isolation

*   tenant\_id được:
    *   Trích từ JWT
    *   Bắt buộc trong authorization request
*   Policy & data **chỉ load trong tenant scope**

#### 4\. Zero Trust

*   Gateway:
    *   Không tin client
    *   Không tin resource server
*   Microservice:
    *   Không tự quyết định quyền
    *   Chỉ nhận request đã được authorize

#### 5\. Audit & Compliance

*   Mọi quyết định **ALLOW / DENY** đều được:
    *   Ghi log
    *   Gắn actor, tenant, policy\_id
*   Phục vụ:
    *   Audit
    *   Forensics
    *   Compliance

### 8.2.4. Luồng Refresh Và Revocation Token

![]()

**✅ Giải thích sơ đồ**

#### 1\. Token Strategy

*   **Access Token**
    *   Short‑lived
    *   Stateless
*   **Refresh Token**
    *   Stateful
    *   Lưu & kiểm soát tại IAM

#### 2\. Multi‑Tenant Enforcement

*   Refresh token luôn gắn:
    *   tenant\_id
    *   user\_id
*   Không cho refresh token dùng sai tenant

#### 3\. Zero Trust

*   Mọi request sau revoke đều bị từ chối
*   Gateway **luôn introspect** khi nghi ngờ
*   Không cache quyết định revoke quá lâu

#### 4\. Revocation Triggers

*   User logout
*   Admin khóa user
*   Tenant bị disable
*   Security incident

#### 5\. Audit & Compliance

*   Ghi log cho:
    *   Token refresh
    *   Refresh denied
    *   Token revoke
*   Phục vụ:
    *   Forensics
    *   Incident response
    *   Compliance audit

### 8.2.5. Luồng gọi nội bộ giữa các Microservices

![]()

**✅ Giải thích sơ đồ**

#### 1\. Service Account (M2M)

*   Không gắn người dùng
*   Gắn:
    *   tenant\_id
    *   client\_id
    *   scopes
*   Quyền **tối thiểu cần thiết**

#### 2\. OAuth2 Client Credentials

*   Dùng cho:
    *   Microservice ↔ Microservice
    *   Batch / Integration
*   Không có refresh token
*   Token **short‑lived**

#### 3\. Multi‑Tenant Enforcement

*   Service account thuộc **1 tenant duy nhất**
*   Token không dùng được cross‑tenant
*   Policy đánh giá trong tenant scope

#### 4\. Zero Trust

*   Gateway:
    *   Luôn validate token
    *   Không tin service nội bộ mặc định
*   PDP:
    *   Quyết định quyền tập trung
    *   Không embed logic trong service

#### 5\. Audit & Compliance

*   Audit cho:
    *   Token issuance
    *   Authorization decision
*   Phục vụ:
    *   Security audit
    *   Incident investigation

### 8.2.6. Luồng End-To-End từ Người dùng

![]()

**✅ Giải thích Sơ đồ luồng**

#### 1\. AuthN tách biệt AuthZ

*   AuthN (đăng nhập, phát token) **xảy ra trước**
*   Mọi request runtime **không tin token mù**
*   Có thể introspect khi:
    *   Token gần hết hạn
    *   Token nghi ngờ bị revoke

#### 2\. Zero Trust End‑to‑End

*   ✅ Client không tin Gateway
*   ✅ Gateway không tin token
*   ✅ Microservice không tự authorize
*   ✅ PDP là nguồn quyết định duy nhất

#### 3\. Multi‑Tenant xuyên suốt

*   tenant\_id:
    *   Trong JWT
    *   Trong authz request
    *   Trong audit log
*   Không có bước nào bỏ qua tenant context

#### 4\. Audit 3 lớp

**#**

**Lớp**

**Log**

**1**

Authentication

Login / Token Issue

**2**

Authorization

ALLOW / DENY + policy

**3**

Business

Action đã thực hiện

➡️ Đáp ứng **ISO 27001 / OWASP ASVS / GDPR‑like**

#### 5\. Phù hợp triển khai thực tế

*   Gateway có thể:
    *   Cache token validation
    *   Rate‑limit theo tenant
*   PDP có thể:
    *   Cache policy
    *   Scale độc lập

### 8.2.7. Mô hình độc lập từng Tenant

*   Mỗi request phải có:
    *   tenant\_id trong token
*   Mọi query:
    *   Filter theo tenant
*   Không có dữ liệu dùng chung giữa tenant

## 8.3. Phân tích rủi ro & Phòng ngừa

### 8.3.1. Rủi ro kiến trúc & bảo mật

**#**

**ID**

**Rủi ro**

**Mức độ**

**Biện pháp**

**1**

R‑01

Cross‑tenant data leak

High

Tenant‑aware token + policy

**2**

R‑02

Token bị lộ

High

Short‑lived token, revocation

**3**

R‑03

Sai cấu hình IdP tenant

Medium

Validation + sandbox

**4**

R‑04

Privilege escalation

High

RBAC + ABAC + audit

**5**

R‑05

Keycloak/IdP downtime

Medium

HA + fallback

### 8.3.2. Rủi ro vận hành SaaS

**#**

**ID**

**Rủi ro**

**Mức độ**

**Biện pháp**

**1**

R‑06

Tenant cấu hình sai policy

Medium

Policy preview + test

**2**

R‑07

Log quá tải

Medium

Retention + archiving

**3**

R‑08

Scale không đủ

Medium

Auto‑scaling

### 8.3.3. Rủi ro pháp lý & dữ liệu

**#**

**ID**

**Rủi ro**

**Mức độ**

**Biện pháp**

**1**

R‑09

Vi phạm bảo vệ dữ liệu

High

Data isolation + audit

**2**

R‑10

Data residency

Medium

Deploy theo region

**8.4. Giả định & Ràng Buộc (Tóm tắt)**

**Giả định**

*   Mỗi Trường tự quản lý dữ liệu user
*   IAM là nguồn sự thật duy nhất về phân quyền
*   Các microservice tuân thủ chuẩn IAM

**Ràng buộc**

*   SaaS multi‑tenant
*   Zero Trust
*   Không hard‑code tenant logic

## 8.5. Mapping & Reference Summary

**#**

**Tài liệu**

**Vai trò**

**1**

BRD

Nghiệp vụ tổng thể

**2**

SRS

Yêu cầu hệ thống

**3**

FRD

Yêu cầu chức năng chi tiết

**4**

SSD

Thiết kế kiến trúc & kỹ thuật

# 9\. Phụ Lục: TRACEABILITY MATRIX

## 9.1. Business → System → Functional → Test (End‑to‑End)

**#**

**BRD ID**

**Business Requirement**

**SRS ID**

**SRS Section**

**FRD ID**

**FRD Function**

**Test Case ID**

**Test Type**

**1**

BRD‑01

Hệ thống dùng chung cho nhiều Trường

SRS‑AR‑01

2\. Overall Description

FRD‑TM‑01

Tenant Management

TC‑TM‑01

UAT

**2**

BRD‑02

Cách ly dữ liệu giữa các Trường

SRS‑SEC‑02

5.4, 5.6

FRD‑SEC‑01

Tenant Isolation

TC‑SEC‑01

Security

**3**

BRD‑03

Đăng nhập tập trung

SRS‑AUTHN‑01

6.3, 6.4.1

FRD‑AUTHN‑01

Login per Tenant

TC‑AUTHN‑01

System

**4**

BRD‑04

Phân quyền theo vai trò

SRS‑AUTHZ‑01

6.4.3

FRD‑AUTHZ‑01

RBAC Engine

TC‑AUTHZ‑01

Integration

**5**

BRD‑05

Phân quyền theo ngữ cảnh

SRS‑AUTHZ‑02

6.4.3

FRD‑AUTHZ‑02

ABAC Policy

TC‑AUTHZ‑02

Integration

**6**

BRD‑06

Không service nào tự phân quyền

SRS‑ZT‑01

6.1, 6.4

FRD‑ZT‑01

Central PDP

TC‑ZT‑01

Security

**7**

BRD‑07

Ghi nhận truy vết đầy đủ

SRS‑AUD‑01

5.4, 7.4.5

FRD‑AUD‑01

Audit Logging

TC‑AUD‑01

Audit

**8**

BRD‑08

Hỗ trợ tích hợp hệ thống ngoài

SRS‑INT‑01

6.5

FRD‑INT‑01

Client Credentials

TC‑INT‑01

Integration

## 9.2. Security & Zero Trust Traceability

**#**

**BRD ID**

**Security Requirement**

**SRS ID**

**SRS Section**

**FRD ID**

**Control**

**Test Case ID**

**1**

BRD‑SEC‑01

Không tin cậy mặc định

SRS‑ZT‑01

6.1

FRD‑ZT‑01

Token Mandatory

TC‑ZT‑01

**2**

BRD‑SEC‑02

Không truy cập chéo tenant

SRS‑SEC‑02

5.6

FRD‑SEC‑02

Tenant Filter

TC‑SEC‑02

**3**

BRD‑SEC‑03

Thu hồi token tức thì

SRS‑AUTHN‑03

6.4.2

FRD‑TOKEN‑02

Token Revocation

TC‑TOKEN‑02

**4**

BRD‑SEC‑04

Truy vết hành vi

SRS‑AUD‑01

7.4.5

FRD‑AUD‑02

AuthZ Log

TC‑AUD‑02

## 9.3. API & Integration Traceability

**#**

**BRD ID**

**Integration Need**

**SRS ID**

**API Section**

**FRD ID**

**API / Contract**

**Test Case**

**1**

BRD‑INT‑01

Xác thực OIDC

SRS‑OIDC‑01

6.3

FRD‑OIDC‑01

/authorize, /token

TC‑OIDC‑01

**2**

BRD‑INT‑02

Kiểm tra quyền runtime

SRS‑AUTHZ‑01

6.4.3

FRD‑AUTHZ‑03

/authz/decision

TC‑AUTHZ‑03

**3**

BRD‑INT‑03

Microservice không tự phân quyền

SRS‑ZT‑02

6.2

FRD‑ZT‑02

Gateway + PDP

TC‑ZT‑02

## 9.4. Performance & Non‑Functional Traceability

**#**

**BRD ID**

**NFR**

**SRS ID**

**Target**

**FRD ID**

**Design**

**Test Case**

**1**

BRD‑NFR‑01

Hiệu năng AuthZ

SRS‑PERF‑01

≤ 50ms p95

FRD‑PERF‑01

PDP Cache

TC‑PERF‑01

**2**

BRD‑NFR‑02

Scale đa tenant

SRS‑SCALE‑01

≥10k users

FRD‑SCALE‑01

Stateless

TC‑LOAD‑01

**3**

BRD‑NFR‑03

Tuân thủ audit

SRS‑AUD‑02

12 months

FRD‑AUD‑03

Log Retention

TC‑AUD‑03

## 9.5. Coverage Summary (Audit‑Ready)

**#**

**Layer**

**Coverage**

**1**

BRD → SRS

✅ 100%

**2**

SRS → FRD

✅ 100%

**3**

FRD → Test

✅ 100%

**4**

Zero Trust Controls

✅ Covered

**5**

Multi‑Tenant Isolation

✅ Covered

**6**

Audit & Compliance

✅ Covered