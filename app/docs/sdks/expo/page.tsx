import CodeBlock from "../../CodeBlock";

export default function ExpoSDKPage() {
  return (
    <div className="prose-container max-w-none">
      <nav className="text-xs text-[#4A5568] mb-6 flex items-center gap-2">
        <a href="/docs" className="hover:text-[#00D4AA] transition-colors">Docs</a>
        <span>/</span>
        <a href="/docs/sdks" className="hover:text-[#00D4AA] transition-colors">SDKs</a>
        <span>/</span>
        <span className="text-[#3178C6]">Expo</span>
      </nav>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs px-2 py-1 rounded bg-[#3178C6]/10 text-[#3178C6] border border-[#3178C6]/20 font-mono font-bold">EXPO</span>
        <span className="text-xs px-2 py-1 rounded bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 font-mono">Offline-first</span>
      </div>

      <h1 className="text-4xl font-bold text-[#F0F2F5] mb-4">React Native / Expo SDK</h1>
      <p className="text-[#8B95A3] text-lg mb-8 leading-relaxed">
        Built for mobile-first AI applications with offline support via SQLite. Integrates with ImpossibleAI for local LLM inference. Works with Expo SDK 50+.
      </p>

      <div className="my-6 p-4 rounded-lg border border-[#FF6B35]/20 bg-[#FF6B35]/5">
        <p className="text-sm text-[#8B95A3]">
          <strong className="text-[#FF6B35]">ImpossibleAI integration:</strong> When combined with ImpossibleAI, the Expo SDK runs the full 13-stage pipeline on-device with no network required. See the <a href="/areas/impossibleai" className="text-[#00D4AA] hover:underline">ImpossibleAI docs</a> for setup.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4">Installation</h2>
      <CodeBlock lang="bash" code={`npx expo install truenorth-expo expo-sqlite`} />

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Setup</h2>
      <CodeBlock lang="typescript" filename="lib/truenorth.ts" code={`import { TrueNorthMobile } from "truenorth-expo";

export const engine = new TrueNorthMobile({
  provider: "ollama",             // or "openai", "gemini"
  model: "llama3.1",              // local model via ImpossibleAI
  offlineMode: {
    enabled: true,
    storage: "sqlite",
    syncOnReconnect: true,
  },
  compliance: ["dpdp"],
});`} />

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">useTrueNorth Hook</h2>
      <CodeBlock lang="typescript" filename="components/ChatScreen.tsx" code={`import { useTrueNorth } from "truenorth-expo";

export function ChatScreen() {
  const {
    messages,
    send,
    output,
    isTyping,
    isComplete,
    isOnline,
    costUsd,
  } = useTrueNorth({
    yamlPath: "agents/medical_intake.yaml",
    sessionId: "user_priya_intake_001",
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble
            text={item.text}
            isAgent={item.role === "agent"}
          />
        )}
      />
      {isTyping && <TypingIndicator />}
      {!isComplete && (
        <TextInput
          onSubmitEditing={(e) => send(e.nativeEvent.text)}
          placeholder="Type a message..."
        />
      )}
      {isComplete && <OutputCard data={output} />}
      {!isOnline && <OfflineBadge />}
    </View>
  );
}`} />

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Offline Sync</h2>
      <CodeBlock lang="typescript" code={`import { useSyncStatus } from "truenorth-expo";

function SyncStatus() {
  const { pendingSessions, isSyncing, lastSyncAt } = useSyncStatus();

  // TrueNorth automatically syncs when connectivity returns
  // You can also trigger manually:
  const { triggerSync } = useTrueNorth();

  return (
    <View>
      {pendingSessions > 0 && (
        <Text>{pendingSessions} sessions waiting to sync</Text>
      )}
      {isSyncing && <ActivityIndicator />}
    </View>
  );
}`} />

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Expo-specific Notes</h2>
      <div className="space-y-3">
        {[
          "SQLite sessions persist across app restarts automatically",
          "Background sync uses Expo Background Fetch — add the permission in app.json",
          "For camera/photo inputs, use the built-in expo-camera integration in YAML",
          "Push notification reminders use Expo Notifications — configure in truenorth.config.ts",
          "New Architecture (JSI) is supported from truenorth-expo@0.1.3+",
        ].map((note, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-[#8B95A3]">
            <span className="text-[#00D4AA] mt-0.5">→</span>
            <span>{note}</span>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-between pt-6 border-t border-[#1E2329]">
        <a href="/docs/sdks/go" className="text-sm text-[#8B95A3] hover:text-[#00D4AA] transition-colors">← Go SDK</a>
        <a href="/docs" className="text-sm text-[#8B95A3] hover:text-[#00D4AA] transition-colors">Back to Docs →</a>
      </div>
    </div>
  );
}
