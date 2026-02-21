// 'use client';

// import Modal from '@/components/Modal/Modal';
// import type { ModalProps } from '@/components/Modal/types/types'; // ModalProps 타입을 가져옴

// interface CreateTeamModalProps extends ModalProps {
//   // 여기에 팀 생성 모달에 필요한 추가적인 props를 정의할 수 있습니다.
//   // 예를 들어, 팀 생성 성공 시 호출될 콜백 등
// }

// export default function CreateTeamModal({ isOpen, onClose, ariaLabel, ...props }: CreateTeamModalProps) {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose} ariaLabel={ariaLabel || "팀 생성"} {...props}>
//       <div style={{ padding: '20px' }}>
//         <h2>새로운 팀 생성</h2>
//         <p>여기에 팀 생성 폼이 들어갈 예정입니다.</p>
//         {/* 실제 팀 생성 폼 (input, button 등)을 여기에 추가 */}
//         <button onClick={onClose}>닫기</button>
//       </div>
//     </Modal>
//   );
// }
