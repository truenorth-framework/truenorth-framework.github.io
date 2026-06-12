import CodeBlock from "../../CodeBlock";
import { Bc, Callout, EditLink, PageNav } from "../python/page";
import SDK_CSS from "../sdk.css"

export default function ExpoSDKPage() {
  const COLOR = "#4D9EFF";

  const NOTES = [
    "SQLite sessions persist across app restarts automatically — no extra setup needed",
    "Background sync uses Expo Background Fetch — add the permission in app.json",
    "For camera / photo inputs, use the built-in expo-camera integration in YAML",
    "Push notification reminders use Expo Notifications — configure in truenorth.config.ts",
    "New Architecture (JSI) supported from truenorth-expo@0.1.3+",
  ];

  return (
    <>
      <style>{SDK_CSS}</style>
      <article className="sdk-article">
        <Bc lang="Expo" langColor={COLOR} slug="expo" />

        <div className="sdk-tags">
          <span className="sdk-tag" style={{ color: COLOR, background: COLOR+"0D", borderColor: COLOR+"30" }}>Expo</span>
          <span className="sdk-tag" style={{ color: "#FF6B35", background: "#FF6B350D", borderColor: "#FF6B3530" }}>Beta</span>
          <span className="sdk-tag-plain">Offline-first</span>
        </div>

        <h1 className="sdk-h1">React Native / Expo SDK</h1>
        <p className="sdk-lead">Built for mobile-first AI applications with offline support via SQLite. Integrates with ImpossibleAI for local LLM inference. Works with Expo SDK 50+.</p>

        <Callout type="warn" title="ImpossibleAI integration">
          When combined with ImpossibleAI, the Expo SDK runs the full 13-stage pipeline on-device with no network required. See the{" "}
          <a href="/areas/impossibleai" className="sdk-a">ImpossibleAI docs</a>{" "}
          for device requirements and model selection.
        </Callout>

        <h2 className="sdk-h2">Installation</h2>
        <CodeBlock lang="bash" code={`npx expo install truenorth-expo expo-sqlite`} />

        <h2 className="sdk-h2">Initialize</h2>
        <CodeBlock
          lang="typescript"
          filename="lib/truenorth.ts"
          code={`import { TrueNorthMobile } from "truenorth-expo";

export const engine = new TrueNorthMobile({
  provider: "ollama",             // "ollama" | "openai" | "gemini"
  model: "llama3.1",              // local model via ImpossibleAI
  offlineMode: {
    enabled: true,
    storage: "sqlite",
    syncOnReconnect: true,
  },
  compliance: ["dpdp"],
});`}
        />

        <h2 className="sdk-h2">useTrueNorth Hook</h2>
        <CodeBlock
          lang="typescript"
          filename="screens/ChatScreen.tsx"
          code={`import { useTrueNorth } from "truenorth-expo";

export function ChatScreen() {
  const {
    messages, send,
    output, isTyping, isComplete,
    isOnline, costUsd,
  } = useTrueNorth({
    yamlPath:  "agents/medical_intake.yaml",
    sessionId: "user_priya_intake_001",
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble text={item.text} isAgent={item.role === "agent"} />
        )}
      />
      {isTyping && <TypingIndicator />}
      {!isComplete && (
        <TextInput
          onSubmitEditing={e => send(e.nativeEvent.text)}
          placeholder="Type a message…"
        />
      )}
      {isComplete && <OutputCard data={output} />}
      {!isOnline && <OfflineBadge />}
    </View>
  );
}`}
        />

        <h2 className="sdk-h2">Offline Sync</h2>
        <CodeBlock
          lang="typescript"
          code={`import { useSyncStatus, useTrueNorth } from "truenorth-expo";

function SyncStatus() {
  const { pendingSessions, isSyncing } = useSyncStatus();
  const { triggerSync } = useTrueNorth();

  // TrueNorth syncs automatically when connectivity returns.
  // Call triggerSync() to force a manual sync.

  return (
    <View>
      {pendingSessions > 0 && (
        <Text>{pendingSessions} sessions waiting to sync</Text>
      )}
      {isSyncing && <ActivityIndicator />}
    </View>
  );
}`}
        />

        <h2 className="sdk-h2">Expo-specific Notes</h2>
        <ul className="sdk-ul">
          {NOTES.map((note, i) => <li key={i} className="sdk-li">{note}</li>)}
        </ul>

        <PageNav
          prev={{ href: "/docs/sdks/go", label: "Go SDK" }}
          next={{ href: "/docs",         label: "Back to Docs" }}
        />
        <EditLink slug="expo" />
      </article>
    </>
  );
}
