const themes = {

  };
  
const ThemeContext = React.createContext(themes.light);

function App() {
    const [isPreparingPosting, setIsPreparingPosting] = useState(false);

    return (
        <>
        <Header isPreparingPosting={isPreparingPosting} setIsPreparingPosting={setIsPreparingPosting} />
        <div style={{width: '100%', height: '15px'}}></div>
        <Rules />
        {isPreparingPosting ? <PreparePosting isPreparingPosting={isPreparingPosting} setIsPreparingPosting={setIsPreparingPosting} /> : <Posting />}
        </>
    )
}