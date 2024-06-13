import Machine from '@/assets/Machine';

const EmptyNotice = ({height, width}) => {
  // 机器是否能够拥有智能，是一个重要的实践问题，而不是一个哲学问题。
  // As time goes on, the machines will become more like men, and the men more like machines.
  return (
    <div style={{
      display: 'flex',
      // 子元素上下排列
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: height,
      width: width,
      textShadow: "0 1px rgba(0, 0, 0, 0.1)",
      fontFamily: "IBMPlexMono, Monaco, Consolas, 'Courier New', Courier, monospace",
      color: '#222',
      fontSize: '1rem'
    }}>
      <Machine size={90}/>
      {/*<div style={{maxWidth: '550px', padding: '24px'}}>*/}
      {/*  <span>机器是否能够拥有智能，是一个重要的实践问题，而不是一个哲学问题。</span>*/}
      {/*</div>*/}
    </div>
  );
}

export default EmptyNotice;