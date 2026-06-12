import CodeBlock from "../../CodeBlock";

export default function GoSDKPage() {
  return (
    <div className="prose-container max-w-none">
      <nav className="text-xs text-[#4A5568] mb-6 flex items-center gap-2">
        <a href="/docs" className="hover:text-[#00D4AA] transition-colors">Docs</a>
        <span>/</span>
        <a href="/docs/sdks" className="hover:text-[#00D4AA] transition-colors">SDKs</a>
        <span>/</span>
        <span className="text-[#00ADD8]">Go</span>
      </nav>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs px-2 py-1 rounded bg-[#00ADD8]/10 text-[#00ADD8] border border-[#00ADD8]/20 font-mono font-bold">GO</span>
        <span className="text-xs text-[#4A5568]">High-performance · Production-ready</span>
      </div>

      <h1 className="text-4xl font-bold text-[#F0F2F5] mb-4">Go SDK</h1>
      <p className="text-[#8B95A3] text-lg mb-8 leading-relaxed">
        The Go SDK is built for high-throughput production deployments. Supports concurrent sessions, context cancellation, and first-class goroutine safety. Requires Go 1.21+.
      </p>

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4">Installation</h2>
      <CodeBlock lang="bash" code={`go get github.com/amareshhebbar/truenorth-go`} />

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Initialize</h2>
      <CodeBlock lang="go" filename="main.go" code={`package main

import (
    "context"
    "fmt"
    "github.com/amareshhebbar/truenorth-go"
)

func main() {
    engine, err := truenorth.NewEngine(truenorth.Config{
        Provider: "openai",
        Model:    "gpt-4o-mini",
        APIKey:   os.Getenv("OPENAI_API_KEY"),
    })
    if err != nil {
        log.Fatal(err)
    }
    defer engine.Close()
}`} />

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Session Management</h2>
      <CodeBlock lang="go" code={`ctx := context.Background()

session, err := engine.CreateSession(ctx, truenorth.SessionConfig{
    YAMLPath:  "agents/medical_intake.yaml",
    SessionID: "sess_abc123",
})
if err != nil {
    log.Fatal(err)
}

resp, err := session.Send(ctx, "I'm Priya, I'm 28 years old")
if err != nil {
    log.Fatal(err)
}

fmt.Println(resp.Message)   // "Thanks Priya! What is your primary goal?"
fmt.Println(resp.Complete)  // false
fmt.Printf("%.6f USD\\n", resp.CostUSD) // 0.000043 USD`} />

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Concurrent Sessions</h2>
      <CodeBlock lang="go" code={`// Engine is goroutine-safe — share across goroutines
var wg sync.WaitGroup
results := make(chan *truenorth.SessionOutput, 100)

for _, intake := range intakes {
    wg.Add(1)
    go func(data IntakeData) {
        defer wg.Done()

        session, _ := engine.CreateSession(ctx, truenorth.SessionConfig{
            YAMLPath: "agents/medical_intake.yaml",
        })

        for _, msg := range data.Messages {
            resp, _ := session.Send(ctx, msg)
            if resp.Complete {
                results <- session.GetOutput()
                return
            }
        }
    }(intake)
}

wg.Wait()
close(results)`} />

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">HTTP Handler Example</h2>
      <CodeBlock lang="go" filename="handlers/chat.go" code={`func (h *Handler) Chat(w http.ResponseWriter, r *http.Request) {
    var req struct {
        SessionID string \`json:"session_id"\`
        Message   string \`json:"message"\`
    }
    json.NewDecoder(r.Body).Decode(&req)

    session, err := h.engine.GetOrCreate(r.Context(), req.SessionID,
        truenorth.SessionConfig{YAMLPath: "agents/screening.yaml"})
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }

    resp, err := session.Send(r.Context(), req.Message)
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }

    json.NewEncoder(w).Encode(resp)
}`} />

      <div className="mt-12 flex items-center justify-between pt-6 border-t border-[#1E2329]">
        <a href="/docs/sdks/nodejs" className="text-sm text-[#8B95A3] hover:text-[#00D4AA] transition-colors">← Node.js SDK</a>
        <a href="/docs/sdks/expo" className="text-sm text-[#8B95A3] hover:text-[#00D4AA] transition-colors">Expo SDK →</a>
      </div>
    </div>
  );
}
