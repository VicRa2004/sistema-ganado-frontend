import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import "./index.css";

function App() {
   return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <Button>Hello word</Button>
      </ThemeProvider>
   );
}

export default App;
