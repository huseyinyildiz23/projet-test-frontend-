import "@/styles/globals.css"; // Gardez uniquement cet import si vous avez des styles globaux
// Supprimez l'import du fichier SnakeGame.css qui n'est plus nécessaire

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
