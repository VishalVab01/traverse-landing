export type PlatformKey = "windows" | "macos" | "linux" | "android" | "ios";

export type PlatformPageData = {
  key: PlatformKey;
  name: string;
  family: "Desktop" | "Mobile";
  title: string;
  lead: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  detailsTitle: string;
  details: { title: string; text: string }[];
  compatibility: string[];
  note: string;
};

export const platformPages: Record<PlatformKey, PlatformPageData> = {
  windows: {
    key: "windows", name: "Windows", family: "Desktop", title: "A more private connection for Windows.",
    lead: "Get the Traverse VPN experience on your Windows PC or laptop, with encrypted connections and straightforward controls for everyday browsing.",
    description: "A VPN for Windows routes your internet traffic through an encrypted connection and replaces your usual network IP with the VPN server's IP while you are connected. That adds privacy on shared networks and gives you a simple way to choose a virtual location.",
    image: "/images/vpn/photos/airport-work.webp", imageAlt: "Laptop ready for a secure connection while travelling",
    highlights: [
      { title: "Connect in a click", text: "Open the app and connect to a server without configuring a VPN connection from scratch." },
      { title: "Choose your route", text: "Select a server location for the connection you need, then switch when your plans change." },
      { title: "More control", text: "Use available options like auto-connect, kill switch, and split tunneling to tailor protection." },
    ],
    steps: [
      { title: "Choose a plan", text: "Pick the subscription that fits how you use Traverse VPN." },
      { title: "Install the app", text: "Download Traverse VPN for Windows and sign in to your account." },
      { title: "Connect", text: "Choose a server or use quick connect, then browse through the VPN connection." },
    ],
    detailsTitle: "Made for the way you use your PC",
    details: [
      { title: "Everyday privacy", text: "Encryption helps protect traffic when you browse on public or shared Wi-Fi." },
      { title: "Flexible routing", text: "Split tunneling can let selected apps use the VPN while others keep a direct connection." },
      { title: "Connection safeguards", text: "Options such as DNS leak protection and kill switch help reduce exposure if a connection changes." },
      { title: "Windows compatibility", text: "The original product page lists Windows 10 and Windows 11 support, including ARM devices. Check the current installer details for exact requirements." },
    ],
    compatibility: ["Windows 10", "Windows 11", "Windows ARM support listed by Traverse"],
    note: "Available features and compatibility may depend on your app version, plan, and device.",
  },
  macos: {
    key: "macos", name: "macOS", family: "Desktop", title: "Private browsing, at home or on the move.",
    lead: "Bring Traverse VPN to your Mac for an encrypted connection, simple server choices, and a familiar one-tap setup.",
    description: "A VPN for Mac encrypts the connection between your Mac and a VPN server. It can help keep traffic more private on café, hotel, and airport Wi-Fi while masking your regular network IP from the websites you visit.",
    image: "/images/vpn/photos/travel-desk.webp", imageAlt: "Mac style laptop on a travel desk",
    highlights: [
      { title: "A simple setup", text: "Install the macOS app, sign in, and connect without manually building a VPN profile." },
      { title: "Safer shared networks", text: "Add an encrypted layer when using Wi-Fi away from home or the office." },
      { title: "Protection that fits", text: "Use server selection and available connection settings to suit your everyday workflow." },
    ],
    steps: [
      { title: "Pick a plan", text: "Choose a weekly, monthly, or yearly Traverse VPN plan." },
      { title: "Get the Mac app", text: "Install the current macOS version from the official download listing." },
      { title: "Secure your connection", text: "Sign in, choose a server, and connect before you browse." },
    ],
    detailsTitle: "A familiar VPN experience on Mac",
    details: [
      { title: "Encrypted traffic", text: "Protect your connection with modern VPN encryption on the networks you use." },
      { title: "One tap to connect", text: "Connect to a server from the app instead of managing low-level network settings." },
      { title: "Tools for more control", text: "Depending on your version, settings can include kill switch, auto-connect, and split tunneling." },
      { title: "Apple device support", text: "Traverse's original Mac page lists macOS 12 Monterey and later. Confirm current requirements in the app listing." },
    ],
    compatibility: ["macOS 12 Monterey and later (per original page)", "MacBook Air and MacBook Pro", "iMac, Mac mini, Mac Studio and Mac Pro"],
    note: "Available features and compatibility may depend on your app version, plan, and device.",
  },
  linux: {
    key: "linux", name: "Linux", family: "Desktop", title: "A straightforward VPN for Linux.",
    lead: "Traverse's Linux page highlights graphical and command-line options for users who want privacy without a complicated setup.",
    description: "Connect your Linux computer through an encrypted VPN tunnel, choose a server location, and keep the same everyday privacy tools close at hand. The original product page describes support for popular distributions and both GUI and CLI workflows.",
    image: "/images/vpn/photos/cafe-laptop.webp", imageAlt: "Laptop open and ready for work in a café",
    highlights: [
      { title: "GUI and CLI options", text: "Choose the workflow that fits your setup, whether you prefer a graphical app or terminal controls." },
      { title: "Common distributions", text: "The original Linux page names Ubuntu, Debian, Fedora, Linux Mint, and Arch among its supported options." },
      { title: "Open standards", text: "Traverse describes support for established VPN protocols such as WireGuard and OpenVPN." },
    ],
    steps: [
      { title: "Choose your plan", text: "Select the Traverse VPN subscription you want to use." },
      { title: "Install for your distro", text: "Follow the current Linux download instructions for your distribution and architecture." },
      { title: "Connect your way", text: "Use the app or the documented command-line workflow to connect to a server." },
    ],
    detailsTitle: "Privacy with room for your workflow",
    details: [
      { title: "Encrypted connection", text: "Route traffic through the VPN to add privacy on networks you do not control." },
      { title: "Leak safeguards", text: "Traverse describes DNS and IPv6 leak safeguards on its Linux feature page." },
      { title: "Flexible controls", text: "Use available features such as kill switch and split tunneling to manage how traffic is routed." },
      { title: "Distribution support", text: "Supported distributions and package availability can change. Use Traverse's current Linux instructions before installing." },
    ],
    compatibility: ["Ubuntu", "Debian", "Fedora", "Linux Mint and Arch (as listed by Traverse)"],
    note: "Linux packages, supported versions, and available features can vary; check the official setup guide for current details.",
  },
  android: {
    key: "android", name: "Android", family: "Mobile", title: "Your privacy, ready for the everyday.",
    lead: "Protect the connection on the phone that goes everywhere with you, from everyday browsing to public Wi-Fi.",
    description: "The Traverse Android app brings VPN protection to your mobile connection. Connect through an encrypted tunnel, mask your regular IP, and use available privacy features from one app.",
    image: "/images/vpn/photos/city-phone.webp", imageAlt: "Phone user on a city street after dark",
    highlights: [
      { title: "One-tap connection", text: "Open the app, choose a server, and connect before using a shared or unfamiliar network." },
      { title: "Mobile-friendly safeguards", text: "Options such as kill switch and auto-connect can help keep protection aligned with your routine." },
      { title: "Choose app routing", text: "Split tunneling can let you choose which apps use the VPN connection." },
    ],
    steps: [
      { title: "Choose a plan", text: "Pick the plan that works for your needs." },
      { title: "Install Traverse VPN", text: "Find the official Traverse VPN app for Android and sign in." },
      { title: "Connect and browse", text: "Choose a server or connect quickly, then use the internet with your VPN active." },
    ],
    detailsTitle: "Designed to travel with your phone",
    details: [
      { title: "Public Wi-Fi protection", text: "Add an encrypted layer when you join Wi-Fi in cafés, hotels, or airports." },
      { title: "App-based routing", text: "Choose which apps go through the VPN with split tunneling, when available." },
      { title: "Stay connected", text: "Traverse lists auto-connect and kill switch among the Android features on its product page." },
      { title: "Use across devices", text: "Your account can be used on other supported devices too; check the current plan for device limits." },
    ],
    compatibility: ["Android app", "Public Wi-Fi and mobile data", "Other supported devices under one account"],
    note: "Android features and supported versions may vary by device and app release. Check the current store listing.",
  },
  ios: {
    key: "ios", name: "iOS", family: "Mobile", title: "A more private connection for iPhone.",
    lead: "Take Traverse VPN with you for everyday browsing, travel, and the Wi-Fi networks you do not know.",
    description: "A VPN for iPhone routes your internet traffic through an encrypted connection and masks your usual IP while connected. Traverse's iOS page focuses on quick setup, privacy on the go, and an experience designed for the Apple ecosystem.",
    image: "/images/vpn/photos/cafe-phone.webp", imageAlt: "Phone in hand in a public indoor space",
    highlights: [
      { title: "Connect with one tap", text: "Sign in, pick a server, and turn on your VPN connection from the app." },
      { title: "Safer on the go", text: "Use encryption when connecting through public Wi-Fi while travelling or working away from home." },
      { title: "Designed for iPhone", text: "The original page highlights an iPhone and iPad experience within the Apple ecosystem." },
    ],
    steps: [
      { title: "Choose a plan", text: "Select a subscription that fits the way you use Traverse VPN." },
      { title: "Install from the App Store", text: "Get the official Traverse VPN app for iPhone or iPad." },
      { title: "Connect securely", text: "Open the app, sign in, and connect to your preferred server." },
    ],
    detailsTitle: "Everyday privacy for your Apple devices",
    details: [
      { title: "Encrypt your connection", text: "Add a layer of protection to internet traffic on public and shared networks." },
      { title: "Mask your IP", text: "While the VPN is connected, services see the VPN server's IP instead of your usual network address." },
      { title: "More control", text: "Traverse's page describes split tunneling and always-on connection safeguards among its available tools." },
      { title: "Other Apple devices", text: "Traverse lists iPhone and iPad support. Check the current App Store listing for OS compatibility." },
    ],
    compatibility: ["iPhone", "iPad", "Current iOS and iPadOS versions listed in the App Store"],
    note: "Available features and compatibility may depend on your app version, plan, and device.",
  },
};

export const platformKeys = Object.keys(platformPages) as PlatformKey[];
