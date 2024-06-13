import React from "react";
import {Button} from "@/components/air-design";
import styles from './Footbar.less';

interface FootbarProps {
  onSave?: () => void;
}

const Footbar: React.FC<FootbarProps> = (props: any) => {

  const {
    onSave,
  } = props;

  return (
    <div className={styles.container} style={{width: 'calc(100% - 220px)'}}>
      <div style={{paddingRight: '24px'}}>
        {
          onSave && <Button type={"primary"} onClick={onSave}>保存</Button>
        }
      </div>
    </div>
  );
}

export default Footbar;