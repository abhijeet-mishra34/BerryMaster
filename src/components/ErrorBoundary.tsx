import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[BerryMaster] Uncaught error:", error, info);
  }

  handleReset() {
    this.setState({ hasError: false, message: "" });
    window.location.reload();
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-slate-950 p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10 text-4xl">
          ⚠️
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
          <p className="text-sm text-slate-400 max-w-md">
            BerryMaster ran into an unexpected problem. Your data is safe.
          </p>
          {this.state.message && (
            <p className="mt-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-mono text-red-400">
              {this.state.message}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => this.handleReset()}
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/20 px-6 py-2.5 text-sm font-bold text-emerald-400 transition-all hover:bg-emerald-500 hover:text-slate-950"
        >
          Reload App
        </button>
      </div>
    );
  }
}
