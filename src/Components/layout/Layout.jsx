// ✅ FIX: Changed "../components/Nav" → "../Components/Nav" (capital C)
//         Changed "../components/Fotter" → "../Components/Fotter" (capital C)
//         On Linux (case-sensitive filesystem), lowercase imports will FAIL silently or throw errors.

// ✅ FIX: Layout.jsx is at src/Components/layout/Layout.jsx
// "../" goes up to src/Components/ — so Nav is just "../Nav", not "../Components/Nav"
// "../Components/Nav" would resolve to src/Components/Components/Nav ← doesn't exist!
import Nav from "../Nav";
import Fotter from "../Fotter";

function Layout({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Fotter />
    </>
  );
}

export default Layout;