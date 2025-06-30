const CredentialsCard = () => {
    return (
        <div className="bg-blue-50 border border-blue-300 text-blue-900 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-2">🔐 Demo Login Credentials</h2>

            <div className="mb-2">
                <p className="font-medium">👨‍💼 Manager:</p>
                <pre className="bg-white p-2 rounded border text-sm overflow-auto"><code>
                    email: yogeshlodhi1208@gmail.com{'\n'}
                    password: yogesh123{'\n'}
                    username: Yogesh Lodhi
                </code></pre>
            </div>

            <div className="mb-2">
                <p className="font-medium">👨‍💻 Employee:</p>
                <pre className="bg-white p-2 rounded border text-sm overflow-auto"><code>
                    email: yogeshkumar051202@gmail.com{'\n'}
                    password: yogesh123{'\n'}
                    username: Yogesh Kumar
                </code></pre>
            </div>

            <div>
                <p className="font-medium">🌐 Any Other User:</p>
                <pre className="bg-white p-2 rounded border text-sm overflow-auto">
                    <code>
                        Kindly refer README.md file :
                        <a
                            href="https://github.com/Yogeshlodhi/feedback-system"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 underline hover:text-blue-900"
                        >
                            Feedback System
                        </a>
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default CredentialsCard;
