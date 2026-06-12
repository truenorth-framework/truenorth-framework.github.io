import CodeBlock from "../../CodeBlock";
import { Bc, EditLink, PageNav } from "../python/page";
import SDK_CSS from "../sdk.css"

export default function GoSDKPage() {
  const COLOR = "#00ADD8";

  return (
    <>
      <style>{SDK_CSS}</style>
      <article className="sdk-article">
        <Bc lang="Go" langColor={COLOR} slug="go" />

        <div className="sdk-tags">
          <span className="sdk-tag" style={{ color: COLOR, background: COLOR+"0D", borderColor: COLOR+"30" }}>Go</span>
          <span className="sdk-tag-plain">High-throughput · Goroutine-safe · Stable</span>
        </div>

        <h1 className="sdk-h1">Go SDK</h1>
        <p className="sdk-lead">Built for high-throughput production deployments. Supports concurrent sessions, context cancellation, and first-class goroutine safety. Requires Go 1.21+.</p>

        <h2 className="sdk-h2">Installation</h2>
        <CodeBlock lang="bash" code={`go get github.com/amareshhebbar/truenorth-go`} />

        <h2 className="sdk-h2">Initialize</h2>
        <CodeBlock
          lang="go"
          filename="main.go"
          code={`package main

import (
    "context"
    "fmt"
    "log"
    "os"
    truenorth "github.com/amareshhebbar/truenorth-go"
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
}`}
        />

        <h2 className="sdk-h2">Session Management</h2>
        <CodeBlock
          lang="go"
          code={`ctx := context.Background()

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

fmt.Println(resp.Message)              // "Thanks Priya! What is your primary goal?"
fmt.Println(resp.Complete)             // false
fmt.Printf("%.6f USD\\n", resp.CostUSD) // 0.000043 USD`}
        />

        <h2 className="sdk-h2">Concurrent Sessions</h2>
        <p className="sdk-p">The engine is goroutine-safe — share a single instance across all goroutines.</p>
        <CodeBlock
          lang="go"
          code={`var wg sync.WaitGroup
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
close(results)`}
        />

        <h2 className="sdk-h2">HTTP Handler</h2>
        <CodeBlock
          lang="go"
          filename="handlers/chat.go"
          code={`func (h *Handler) Chat(w http.ResponseWriter, r *http.Request) {
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
}`}
        />

        <PageNav
          prev={{ href: "/docs/sdks/nodejs", label: "Node.js SDK" }}
          next={{ href: "/docs/sdks/expo",   label: "Expo SDK" }}
        />
        <EditLink slug="go" />
      </article>
    </>
  );
}
