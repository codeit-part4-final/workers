import { Input, PasswordInput } from '@/components/input';

export default function TestPage() {
  return (
    <main style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h1>Input 컴포넌트 테스트</h1>

      <h2>Atom - Input</h2>
      <div style={{ width: 460 }}>
        <Input placeholder="댓글을 입력해 주세요." />
      </div>

      <div style={{ width: 460 }}>
        <Input placeholder="이메일을 입력해 주세요." type="email" />
      </div>

      <h2>Molecule - PasswordInput</h2>
      <div style={{ width: 460 }}>
        <PasswordInput placeholder="비밀번호를 입력해 주세요." />
      </div>
    </main>
  );
}
