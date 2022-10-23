import BoardUser from "../../../../components/board/BoardUser";
import BoardSearchBar from "../../../../components/board/BoardSearchBar";
import BoardNavBar from "../../../../components/board/BoardNavBar";
import ArticleWriteView from "../../../../components/board/board-id/article-id/ArticleWriteView";
import BoardHeader from "../../../../components/board/BoardHeader";
import { useRouter } from "next/router";
import { useEffect } from "react";
import create from "zustand";
import shallow from "zustand/shallow";
import globalState from "../../../../states/GlobalState";

const useBoardStore = create((set) => ({
    articleId: 0,
    boardId: 0,
    type: 0,
    category: "",
    setArticleId: (ele) => set(() => ({ articleId: ele })),
    setBoardId: (ele) => set(() => ({ boardId: ele })),
    setType: (ele) => set(() => ({ type: ele })),
    setCategory: (ele) => set(() => ({ category: ele })),
}));

export default function article_id({ category: categoryList }) {
    //이전 페이지 (BoardMiniView 등)에서 넘어올 때 Link query로 다음 인자를 받아와야 한다. { type, boardId };;
    const router = useRouter();
    const logon = globalState((state) => state.logon);

    const articleId = router.query["article-id"];
    const boardId = router.query["board-id"];
    const type = router.query["type"];

    const { setArticleId, setBoardId, setType, setCategory, category } =
        useBoardStore((state) => ({
            setArticleId: state.setArticleId,
            setBoardId: state.setBoardId,
            setType: state.setType,
            setCategory: state.setCategory,
            category: state.category,
        }));

    useEffect(() => {
        setArticleId(router.query["article-id"]);
        setBoardId(router.query["board-id"]);
        setType(router.query["type"]);
        setCategory(categoryList[boardId - 1].categoryName);
    }, []);
    useEffect(() => {
        if (!logon) router.push("/");
    }, [logon]);
    return (
        <div>
            <div className="container">
                <div className="headerB">
                    <BoardHeader type={type} boardId={category} />
                </div>
                <div className="userInfo">
                    <BoardUser />
                </div>
                <div className="navBar">
                    <BoardSearchBar placeHolder="게시판 검색" />
                    <BoardNavBar props={categoryList} />
                </div>
                <div className="BoardMain">
                    <ArticleWriteView articleId={articleId} />
                </div>
                <div className="footer"></div>
            </div>
            <style jsx>{`
                .BoardMain {
                    display: flex;
                }
                .container {
                    display: grid;
                    grid-template-areas:
                        "userInfo header header"
                        "userInfo miniB  miniB"
                        "navBar   miniB  miniB"
                        "navBar   miniB  miniB"
                        "navBar   miniB  miniB"
                        "navBar   .      .    "
                        "footer   footer  footer";
                    grid-gap: 16px;
                }
                .headerB {
                    grid-area: header;
                }
                .banner {
                    grid-area: banner;
                }
                .userInfo {
                    grid-area: userInfo;
                }
                .navBar {
                    grid-area: navBar;
                }
                .BoardMain {
                    grid-area: miniB;
                    display: contents;
                }
                .footer {
                    grid-area: footer;
                }
            `}</style>
        </div>
    );
}

export const getServerSideProps = async () => {
    try {
        // const response = await fetch("http://milidream.ml/api/board/category");
        const response = await fetch(
            "http://localhost:3000/api/board/category"
        );
        console.log(response);
        //ISSUE : https://yceffort.kr/2021/10/get-absolute-url-in-nextjs 참고하여 추후 각 실행 환경마다 바뀌는 절대경로에 대한 처리 필요.
        if (response.status >= 500) {
            const response = await fetch(
                "http://20.249.6.135:8080/board/category"
            );
            const category = await response.json();
            return {
                props: category,
            };
        } else {
            const category = await response.json();
            return {
                props: category,
            };
        }
    } catch {
        return {
            props: {
                category: [],
            },
        };
    }
};
