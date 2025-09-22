import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {MainPage} from "@/MainPage.tsx";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 10 * 1000,
    }
  }
})

// @ts-expect-error we dont need typing
window.__TANSTACK_QUERY_CLIENT__ = queryClient

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
