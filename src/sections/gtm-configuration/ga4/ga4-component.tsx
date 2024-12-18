import { useState } from "react";
import classnames from "classnames/bind";
import styled from "./ga4-component.module.scss";

const cx = classnames.bind(styled);

const Ga4 = () => {
  const [positiveTriggerId, setPositiveTriggerId] = useState<string[]>([]);

  return (
    <div className={cx('tag-config-container')}>
      <h1 className={cx('tag-config-title')}>Cấu hình thẻ</h1>
      <p>Loại thẻ</p>

      <div className={cx('field-group')}>
        <label className={cx('tag-type')}>Tag Type</label>
      </div>

      <div className={cx('field-group')}>
        <label>Measurement code</label>
        <input
          type="text"
          id="positive-trigger-id"
          value={positiveTriggerId.join(", ")}
          onChange={(e) => setPositiveTriggerId(e.target.value.split(",").map(id => id.trim()))}
          placeholder="Nhập ID kích hoạt"
        />
      </div>

      <div className={cx('field-group')}>
        <label>Event name</label>
        <input
          type="text"
          id="positive-trigger-id"
          value={positiveTriggerId.join(", ")}
          onChange={(e) => setPositiveTriggerId(e.target.value.split(",").map(id => id.trim()))}
          placeholder="input event name"
        />
      </div>

      <div className={cx('field-group')}>
        <label>Event name</label>
        <input
          type="text"
          id="positive-trigger-id"
          value={positiveTriggerId.join(", ")}
          onChange={(e) => setPositiveTriggerId(e.target.value.split(",").map(id => id.trim()))}
          placeholder="input event name"
        />
      </div>

    </div>
  );
};

export default Ga4;