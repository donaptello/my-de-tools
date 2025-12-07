interface Props {
    darkMode: boolean;
}

export default function Footers({darkMode}: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`mt-2 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-300'}`}>
      <div className="text-center text-sm text-gray-500">
        &copy; {currentYear} <a href="https://github.com/donaptello" target="_blank" className="font-semibold underline text-gray-900">Nathan Parama</a>. All rights reserved.
      </div>
    </footer>
  );
}
