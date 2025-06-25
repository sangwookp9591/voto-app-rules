import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.page}>
            <main className="flex flex-col gap-8">
                <section className="bg-white rounded-card shadow-card p-8 border border-soopborder">
                    <h1 className="text-3xl font-bold text-soopgreen mb-4">투표 앱에 오신 것을 환영합니다!</h1>
                    <div className="text-lg text-sooptext mb-6">
                        이 앱은 공정하고 투명한 투표를 위해 만들어졌습니다. 아래 규칙을 꼭 확인해 주세요.
                    </div>
                    <ul className="list-disc pl-6 text-sooptext mb-6">
                        <li>로그인(카카오, 구글, 일반 회원가입) 후 1인 1표만 투표할 수 있습니다.</li>
                        <li>투표 마감 시간 이후에는 투표가 불가합니다.</li>
                        <li>진행 중/종료된 투표는 결과 페이지에서 확인할 수 있습니다.</li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="/vote"
                            className="flex-1 px-6 py-3 bg-soopgreen text-white rounded-btn shadow-btn text-center font-semibold hover:bg-soopblue transition"
                        >
                            투표 시작/참여
                        </a>
                        <a
                            href="/result"
                            className="flex-1 px-6 py-3 bg-soopgray text-soopgreen border border-soopgreen rounded-btn text-center font-semibold hover:bg-soopgreen hover:text-white transition"
                        >
                            진행 중/종료된 투표 안내
                        </a>
                    </div>
                </section>
                <section className="bg-white rounded-card shadow-card p-8 border border-soopborder">
                    <h2 className="text-xl font-semibold text-soopgreen mb-2">투표 일정</h2>
                    <div className="text-sooptext">2024년 7월 1일 ~ 2024년 7월 7일</div>
                </section>
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
                    Learn
                </a>
                <a
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
                    Examples
                </a>
                <a
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
