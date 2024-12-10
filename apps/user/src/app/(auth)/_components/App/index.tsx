import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

export default function App(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.followNews}>
        <h1 className={styles.h1}>フォローニュース</h1>
        {Array(10)
          .fill(undefined)
          .map((_, index) => (
            <article
              className={styles.article}
              data-article={index % 3 === 0 ? "pickup" : "dropoff"}
              key={index}
            >
              <Link href="/news/hoge">
                <div className={styles.thmubnail}>
                  <Image
                    alt=""
                    fill={true}
                    quality={100}
                    src="https://img.youtube.com/vi/FIAKcjtdXQo/maxresdefault.jpg"
                  />
                </div>
              </Link>
              <div className={styles.detail}>
                <Link href="/news/hoge">
                  <div className={styles.title}>投稿したよ！</div>
                  <div className={styles.date}>3 時間前</div>
                </Link>
                <Link href="/vtuber/hoge">
                  <div className={styles.user}>
                    <Image
                      alt=""
                      className={styles.icon}
                      height={24}
                      src="https://yt3.googleusercontent.com/yv7Myimz11d0URsPtpeoLe18mx7UUeFInVOag9j2uZUWh0i24bH8AY7jvPPcNeEhqylxw4xrEw=s160-c-k-c0x00ffffff-no-rj"
                      width={24}
                    />
                    <div className={styles.name}>冷夏茶みしろ</div>
                  </div>
                </Link>
              </div>
            </article>
          ))}
      </div>
      <div className={styles.topNews}>
        <h2 className={styles.h2}>トップニュース</h2>
        {Array(10)
          .fill(undefined)
          .map((_, index) => (
            <article className={styles.article} key={index}>
              <div className={styles.thmubnail}>
                <Image
                  alt=""
                  fill={true}
                  quality={100}
                  src="https://img.youtube.com/vi/FIAKcjtdXQo/maxresdefault.jpg"
                />
              </div>
              <div className={styles.detail}>
                <div className={styles.title}>投稿したよ！</div>
                <div className={styles.date}>3 時間前</div>
                <div className={styles.user}>
                  <Image
                    alt=""
                    className={styles.icon}
                    height={24}
                    src="https://yt3.googleusercontent.com/yv7Myimz11d0URsPtpeoLe18mx7UUeFInVOag9j2uZUWh0i24bH8AY7jvPPcNeEhqylxw4xrEw=s160-c-k-c0x00ffffff-no-rj"
                    width={24}
                  />
                  <div className={styles.name}>冷夏茶みしろ</div>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
