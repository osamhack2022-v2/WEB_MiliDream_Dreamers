import Link from "next/link";
//next.js에서 react처럼 페이지 간 이동을 위해서 <Link> 컴포넌트를 꼭 써야 한다.
import { useRouter } from "next/router";

//만약 로그인된 상태라면 로그아웃을 출력해야 함.
//회원가입은 정보수정 정도로 하면 괜찮을 듯
export default function NavBar() {
  const router = useRouter();
  return (
    <header>
      <nav>
        <Link href="/">
          <img
            style={{
              position: "relative",
              top: "-16px",
              left: "-30px",
            }}
            src="/img/NavBar/logo.svg"
          />
        </Link>

        <ul
          className="rightboard"
          style={{
            position: "relative",
            top: "-20px",
          }}
        >
          <li>
            <Link href="/login">
              <a>로그인</a>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>CONTACT</a>
            </Link>
          </li>
        </ul>
        <ul
          className="middleboard"
          style={{
            position: "relative",
            right: "180px",
            top: "-22px",
            textAlign: "center",
          }}
        >
          <li>
            <Link href="/map">
              <a>진로 설계</a>
            </Link>
          </li>
          <li>
            <Link href="/board">
              <a>게시판</a>
            </Link>
          </li>
          <li>
            <Link href="/career/contest">
              <a>공모전</a>
            </Link>
          </li>
          <li>
            <Link href="/career/survey">
              <a>유형 조사</a>
            </Link>
          </li>

          <li>
            <Link href="/user/$[id]">
              <a>유저페이지</a>
            </Link>
          </li>
        </ul>

        {/*styled jsx 방식 : js 백틱을 이용해 일반 css 코드를 삽입할 수 있다. 하지만 이 css가 적용받는 범위는 함수 내부로 한정된다.*/}
        <style jsx>
          {`
            nav {
              height: 107px;
              line-height: 150px;
              text-align: centor;
            }
            img {
              width: 210px;
              cursor: pointer;
              padding-left: 50px;
            }
            .rightboard {
              float: right;
              list-style: none;
              padding: 0;
              display: flex;
              padding-right: 60px;
              transition: 0.2s;
            }
            .rightboard li {
              margin: 0px 8px;
              width: 30;
              font-size: 12px;
              font-weight: 400;
              line-height: 100px;
              padding-left: 30px;
            }
            .middleboard {
              float: right;
              list-style: none;
              padding: 0;
              display: flex;
              padding-right: 150px;
              text-align: center;
              justify-content: center;
              align-items: center;
            }
            .middleboard a {
              font-weight: 600;
              transition: 0.2s;
            }

            .middleboard a:hover {
              color: #a593e0;
              // transition-duration: 2ms;
              // transition-delay: 2ms;
              transition: 0.25s;
            }
            a {
              color: #000000;
              display: block;
              height: 70px;
              transition: 0.25s;
            }
            a:hover {
              opacity: 0.4;
              transition: 0.2s;
            }
            .middleboard li {
              margin: 0px 16px;
              width: 30;
              font-size: 18px;
              font-weight: 800;
              line-height: 100px;
              padding-left: 30px;
            }
          `}
        </style>
      </nav>
    </header>
  );
}

// li의 line-height는 로그인 등 헤더의 txt 부분 높이 조절
// nav의 line-height는 로고 아이콘 부분 높이 조절
