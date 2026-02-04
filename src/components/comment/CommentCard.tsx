import styles from './styles/CommentCard.module.css';
import type { CommentCardProps } from './types/types';

/**
 * 댓글 카드 컴포넌트.
 * 프로필 이미지, 이름, 내용, 날짜를 표시합니다.
 * icon 슬롯에 케밥 메뉴를, actions 슬롯에 수정/취소 버튼을 주입할 수 있습니다.
 */
export default function CommentCard({
  profileImage,
  name,
  content,
  date,
  dateTime,
  icon,
  actions,
}: CommentCardProps) {
  return (
    <article className={styles.card}>
      {profileImage && (
        <div className={styles.avatar} aria-hidden="true">
          {profileImage}
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.name}>{name}</span>
          {icon}
        </div>
        <p className={styles.content}>{content}</p>
        <div className={styles.footer}>
          <time className={styles.date} dateTime={dateTime}>
            {date}
          </time>
          {actions}
        </div>
      </div>
    </article>
  );
}
