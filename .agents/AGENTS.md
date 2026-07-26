# Communication Style
- Always communicate with the user exclusively in transliterated Telugu (Telugu written using English alphabets/letters). 
- Example: Instead of "How can I help you?", say "Nenu meeku ela sahayam cheyagalanu?"
- Technical terms, code snippets, and specific file names can remain in standard English, but conversational text must be transliterated Telugu.

# Flutter Project Context Rule
- When the user asks to "read my flutter project" (e.g., "na fluter project read chey"), you MUST immediately read the following artifacts to understand the project's architecture and roadmap:
  1. `flutter_architecture_spec.md`
  2. `implementation_plan.md`
- You must also thoroughly analyze the `quicktools_app` directory to check the current progress against the 8-Phase Implementation Plan before writing any new code.

# QuickTools.ai - Flutter App Rules

## Goal
Build a premium, fast, consistent AI SaaS mobile/desktop app frontend using Flutter, matching the same design language and UX quality as the web app.

## Tech Stack
- Flutter (stable channel)
- Dart (null-safety)
- Riverpod (state management) — use Bloc only if the team prefers event-driven architecture
- go_router (navigation)
- Freezed + json_serializable (models)
- Dio (networking)
- flutter_hooks (optional, only when it simplifies widget logic)
- flutter_form_builder + form validation (or reactive_forms)
- flutter_animate or implicit AnimatedContainer/AnimatedOpacity (minimal animation)
- flutter_svg (icons/illustrations)
- cached_network_image (images)
- shared_preferences / hive (local storage)
- flutter_secure_storage (tokens/secrets)

## Design System
Always use the global design system. Define it once in lib/theme/app_theme.dart and lib/theme/app_colors.dart. Never hardcode colors/spacing/typography inline in widgets.

### Brand Colors
- Primary: #4F46E5
- Primary Hover/Pressed: #4338CA
- Secondary: #7C3AED
- Accent: #0EA5E9
- Background: #F8FAFC
- Surface: #FFFFFF
- Text Primary: #111827
- Text Secondary: #6B7280
- Border: #E5E7EB
- Success: #22C55E
- Warning: #F59E0B
- Error: #EF4444

Never introduce random colors. All colors must come from AppColors.

### Typography
- Font: Inter (via google_fonts or bundled asset)
- Heading: FontWeight.w700
- Subheading: FontWeight.w600
- Body: FontWeight.w400
- Button: FontWeight.w600

Define a single TextTheme in AppTheme (h1–h4, bodyLarge, bodyMedium, labelLarge, caption). Never set inline TextStyle with random sizes/weights — extend the theme instead.
Line height should always be readable (1.4–1.6 for body text).

## Layout
Use LayoutBuilder / MediaQuery breakpoints:
- Desktop/Web: ≥ 1440px → 3-column layouts, max content width 1200px
- Laptop/Tablet Landscape: ≥ 1024px
- Tablet: ≥ 768px
- Mobile: ≥ 375px (design baseline)

Always design Mobile First. Use an 8px spacing system (AppSpacing.xs=4, sm=8, md=16, lg=24, xl=32, xxl=48) — never hardcode raw pixel values in EdgeInsets/SizedBox.

## Widgets (Components)
Every UI element must be a reusable widget under lib/widgets/ (or lib/components/). Build:
- Button (Primary / Secondary / Ghost / Icon)
- TextInput / Textarea
- Dropdown / Select
- Checkbox / Radio
- Modal (Dialog) / BottomSheet (Drawer)
- Tooltip
- Toast / SnackBar wrapper
- Badge
- Avatar
- Card
- TabBar
- ExpansionTile (Accordion)
- Navbar / AppBar
- Sidebar / NavigationRail
- Footer
- Pagination
- SearchBar
- Breadcrumb
- EmptyStateWidget
- ErrorStateWidget
- LoadingStateWidget
- SkeletonLoader (shimmer)

### Cards
- Radius: 16px (BorderRadius.circular(16))
- Soft shadow only (BoxShadow(blurRadius: 12, color: Colors.black.withOpacity(0.05)))
- White (Surface) background
- Subtle hover/press animation (scale 0.98 or elevation change) on tap-capable cards

Never use heavy/dark drop shadows.

### Buttons
- Primary: Indigo background, white text
- Secondary: White background, Indigo border
- Ghost: Transparent background, Indigo text
- Icon Button: Circular, consistent size (40x40 or 48x48 touch target)

All buttons must implement hover (web/desktop), pressed, and disabled visual states — use MaterialStateProperty / WidgetStateProperty resolvers, not one-off styles.

### Forms
- Use flutter_form_builder (or reactive_forms) for form state.
- Validate with a shared Validators utility (email, required, min length, password strength) — keep validation logic out of widgets.
- Every form must support: Loading, Success, Error, Disabled, Field-level validation states.
- Inputs: 12px radius, visible focus ring/border color change, accessible labels (never placeholder-as-label), helper text slot, error message slot with Error color.

Never use a placeholder as the only label.

### Icons
- Use Icons (Material) or lucide_icons package (Flutter port of Lucide) for parity with the web app.
- Keep icon sizes consistent: 16 / 20 / 24 / 32px scale only.

### Images
- Always use CachedNetworkImage for remote images (never bare Image.network).
- Provide placeholder (skeleton/shimmer) and errorWidget for every image.
- Serve/request WebP where the backend supports it.
- Use fit: BoxFit.cover + fixed aspect ratio boxes to prevent layout shift.

### Animations
- Use implicit animations (AnimatedContainer, AnimatedOpacity, AnimatedSwitcher) or flutter_animate only when animation adds clarity.
- Duration: 150–250ms, curve Curves.easeInOut.
- Avoid unnecessary motion — no animation purely for decoration.

## Responsive Rules
- No horizontal overflow — wrap content in SingleChildScrollView where needed, use Wrap/Flexible/Expanded instead of fixed widths.
- Use Row/Column + Flexible/Expanded, and LayoutBuilder for breakpoint-based layouts (avoid hardcoded widths except for max-content constraints).

## Accessibility
- Full keyboard/focus navigation on web/desktop builds (FocusTraversalGroup, Focus widgets).
- Use Semantics widgets / semanticLabel on icons, images, and custom controls.
- Visible focus indicators (do not remove default focus highlight without replacing it).
- Prefer semantic widgets (Text, Icon, Button variants) over raw GestureDetector + Container for anything interactive.
- Minimum touch target size: 48x48 logical pixels.

## SEO (Flutter Web builds only)
For Flutter Web deployments, every route must set: page <title>, meta description, Open Graph tags, Twitter Card tags, canonical URL, and structured data — via flutter_web_plugins' URL strategy + custom <head> injection, or by rendering marketing/SEO pages with Next.js and keeping Flutter for the authenticated app shell only.

## Performance
- Target smooth 60fps scroll/animation; avoid jank (profile with DevTools).
- Prefer const constructors everywhere possible.
- Avoid rebuilding large widget trees — scope Riverpod/Bloc listeners narrowly (select, Consumer at the leaf, not the root).
- Use ListView.builder/GridView.builder for lists — never build unbounded lists eagerly.
- Lazy-load routes with go_router's deferred loading where applicable.
- Optimize images and fonts (subset fonts, compress assets).
- Avoid unnecessary setState/rebuild cascades.

## Folder Structure
```
lib/
  app/            // app entrypoint, routing, theme wiring
  theme/          // AppColors, AppTheme, AppSpacing, AppTextStyles
  widgets/        // shared reusable components
  features/       // feature-based modules (auth, tools, dashboard, billing)
  hooks/          // custom hooks (if using flutter_hooks)
  services/       // API clients, repositories
  models/         // Freezed data models
  utils/          // validators, formatters, helpers
  providers/      // Riverpod providers
```

## Naming
- PascalCase for widgets/classes (PrimaryButton, ToolCard)
- camelCase for functions/variables
- useSomething for hooks (useDebounce)
- Descriptive, feature-scoped filenames (tool_card.dart, auth_repository.dart)

## Error Handling
Every screen must have: Loading state, Skeleton loader, Empty state, Error state with a Retry button — implemented via a shared AsyncValueWidget/StateHandler wrapper around Riverpod AsyncValue, not duplicated per screen.

## Tool Screens
Every AI Tool screen must include: Hero section, Tool description, Input section, Settings/options panel, Generate button, Loading screen, Result screen, Download button, Copy button, Share button, History, Related tools, FAQ, CTA section.

## Navigation
AppBar/Navbar, Bottom Navigation or Sidebar (adaptive by breakpoint), Breadcrumb (desktop/web), Search, Related tools, Deep linking via go_router.

## Production & Store Deployment Readiness
Beyond UI rules, a real app-store-ready Flutter app needs the following. Nothing here is optional if you plan to submit to both stores.

### App Identity
- App name (final, store-search-friendly) decided and locked.
- Bundle ID / Package name set and never changed after first release:
  - iOS: com.quicktools.app (reverse-DNS, in ios/Runner.xcodeproj)
  - Android: applicationId in android/app/build.gradle
- App icon: 1024x1024 master PNG → generate all sizes with flutter_launcher_icons package (adaptive icon for Android, all iOS sizes).
- Splash screen: use flutter_native_splash package, matching brand background (#F8FAFC) + logo, generated for both platforms.
- Versioning: pubspec.yaml → version: 1.0.0+1 (semantic version + build number). Increment build number on every submission.

### Platform Configuration
**Android**
- android/app/build.gradle: minSdkVersion, targetSdkVersion set to current Play Store required target API level (check Play Console requirements each year).
- Signing config: generate an upload keystore (.jks), store key.properties outside version control, configure release signing in build.gradle.
- AndroidManifest.xml: only declare permissions actually used (camera, storage, internet, notifications, etc.) — unused permissions cause review rejection.
- Enable Play App Signing in Play Console.
- Generate an Android App Bundle (.aab), not a raw APK, for release: flutter build appbundle --release.

**iOS**
- Set Bundle ID, Team, and signing (Automatic or manual with a Distribution certificate + provisioning profile) in Xcode.
- Info.plist: add usage-description strings for every permission requested (NSCameraUsageDescription, NSPhotoLibraryUsageDescription, NSUserTrackingUsageDescription, etc.) — missing strings cause instant App Store rejection.
- Set deployment target (minimum iOS version supported).
- Build with flutter build ipa --release and upload via Xcode / Transporter.

### Legal & Compliance (required by both stores)
- Privacy Policy URL — mandatory for both stores, must be publicly hosted (not just in-app text).
- Terms of Service page/link.
- Account deletion flow — Google Play requires an in-app way to delete account/data if you support account creation; Apple requires the same since Guideline 5.1.1(v).
- Data Safety form (Play Console) and App Privacy "Nutrition Label" (App Store Connect) — must accurately list what data is collected (analytics, ads ID, email, etc.).
- Age rating / content rating questionnaire completed on both consoles.
- Export compliance (iOS) — declare encryption usage (usually "uses standard HTTPS only" = exempt, but must be answered).

### Store Listing Assets
- App icon (already covered above), used again as the store listing icon.
- Screenshots for every required device size:
  - iOS: 6.7", 6.5", 5.5" iPhone sizes (+ iPad if supporting tablet).
  - Android: phone + 7"/10" tablet if supporting tablets.
- Feature graphic (Play Store, 1024x500).
- Short description (Play, ≤80 chars) and full description (≤4000 chars), with target keywords naturally included.
- App Store subtitle (30 chars) and keywords field (100 chars, comma-separated, no spaces).
- Promo video (optional but recommended for conversion).
- Support URL and Marketing URL.

### Core App Functionality Checklist
- Authentication: sign in / sign up / forgot password / social login (if used) all handle loading, error, and success states.
- Deep linking / Universal Links: configured (go_router + AndroidManifest.xml intent filters + iOS Associated Domains) so shared tool links open directly inside the app.
- Push notifications: Firebase Cloud Messaging (or APNs directly) wired up, permission request flow follows platform guidelines (iOS: soft-ask before system prompt).
- Offline handling: graceful "no internet" state, retry logic, cached last-known data where relevant.
- In-app purchases / subscriptions (if monetized): in_app_purchase package, receipt validation server-side, restore purchases flow (mandatory for Apple approval).
- Crash reporting: Firebase Crashlytics (or Sentry) integrated before first release.
- Analytics: Firebase Analytics / Mixpanel/Amplitude wired for key funnel events.
- Remote config / feature flags (optional but useful for staged rollouts).
- Force-update mechanism: check app version against backend, prompt update if below minimum supported version.

### Testing Before Submission
- Test on real low-end and high-end devices for both platforms, not just simulators/emulators.
- Test on at least one tablet if "supports tablet" is enabled in either store listing (stores reject tablet screenshots that don't match actual tablet UI).
- Full regression pass: signup → core tool flow → payment (if any) → logout → account deletion.
- No debug banners, no print()/debugPrint() leaking into release builds.
- Run flutter analyze and fix all warnings/errors before building release.
- Test release build specifically (--release mode), not just debug — some bugs (obfuscation, ProGuard/R8 stripping on Android) only appear in release.

### CI/CD (recommended, not strictly mandatory)
- Automate builds with Codemagic, GitHub Actions + fastlane, or Bitrise.
- Auto-increment build numbers per pipeline run.
- Automated upload to TestFlight (iOS) and Play Console Internal Testing track (Android) before every production release.

### Submission Process Order
- Internal testing (TestFlight / Play Internal Testing) with real testers.
- Closed/Open beta (optional but recommended, especially for Android's new-developer review requirements — Play now requires 12+ testers for 14+ days on new accounts before production access for some categories).
- Submit for review with all store listing assets + compliance forms complete.
- Monitor review status; respond quickly to any rejection (most common: missing permission strings, broken account deletion, missing privacy policy, crashes on review device).

## Final Quality Checklist
Before completing any screen:
- [ ] Responsive across mobile/tablet/desktop breakpoints
- [ ] Built from reusable widgets (no copy-pasted UI)
- [ ] Accessible (Semantics, focus, touch targets)
- [ ] Null-safe, strongly typed (no dynamic leaking into UI)
- [ ] No debug prints / console errors
- [ ] No duplicate widget code
- [ ] Smooth 60fps, no jank
- [ ] const constructors used wherever possible
- [ ] App icon, splash screen, and version/build number set
- [ ] Signing configured (Android keystore / iOS distribution cert)
- [ ] Permission strings + permissions declared match actual usage
- [ ] Privacy Policy, Terms of Service, and account deletion flow live
- [ ] Data Safety form (Play) / App Privacy labels (App Store) completed
- [ ] Screenshots, store description, and metadata ready for both stores
- [ ] Crash reporting + analytics integrated
- [ ] Tested in release mode on real devices
- [ ] Production ready
