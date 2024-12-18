import React, { useState } from "react";
import classnames from "classnames/bind";
import styled from "./ga4-component.module.scss";

const cx = classnames.bind(styled);

const Ga4 = () => {
  const [tagType, setTagType] = useState("");
  const [positiveTriggerId, setPositiveTriggerId] = useState<string[]>([]);
  const [consentSetting, setConsentSetting] = useState(null);
  const [containerId, setContainerId] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [status, setStatus] = useState("");
  const [parameters, setParameters] = useState<string[]>([]);

  return (
    <div className={cx('tag-config-container')}>
      <h1 className={cx('tag-config-title')}>Cấu hình thẻ</h1>

      {/* Tag Type */}
      <div className={cx('field-group')}>
        <label htmlFor="tag-type">Loại thẻ</label>
        <input
          type="text"
          id="tag-type"
          value={tagType}
          onChange={(e) => setTagType(e.target.value)}
          required
          placeholder="Nhập loại thẻ"
        />
      </div>

      {/* Positive Trigger ID */}
      <div className={cx('field-group')}>
        <label htmlFor="positive-trigger-id">ID Kích hoạt Dương</label>
        <input
          type="text"
          id="positive-trigger-id"
          value={positiveTriggerId.join(", ")}
          onChange={(e) => setPositiveTriggerId(e.target.value.split(",").map(id => id.trim()))}
          placeholder="Nhập ID kích hoạt, cách nhau bằng dấu phẩy"
        />
      </div>

      {/* Consent Setting */}
      <div className={cx('field-group')}>
        <label htmlFor="consent-setting">Cài đặt đồng ý</label>
        <select
          id="consent-setting"
          value={consentSetting || ""}
          onChange={(e) => setConsentSetting(e.target.value)}
        >
          <option value="">Chọn cài đặt đồng ý...</option>
          <option value="option1">Tùy chọn 1</option>
          <option value="option2">Tùy chọn 2</option>
        </select>
      </div>

      {/* Container ID */}
      <div className={cx('field-group')}>
        <label htmlFor="container-id">Container ID</label>
        <input
          type="text"
          id="container-id"
          value={containerId}
          onChange={(e) => setContainerId(e.target.value)}
          required
          placeholder="Nhập Container ID"
        />
      </div>

      {/* Workspace ID */}
      <div className={cx('field-group')}>
        <label htmlFor="workspace-id">Workspace ID</label>
        <input
          type="text"
          id="workspace-id"
          value={workspaceId}
          onChange={(e) => setWorkspaceId(e.target.value)}
          required
          placeholder="Nhập Workspace ID"
        />
      </div>

      {/* Status */}
      <div className={cx('field-group')}>
        <label htmlFor="status">Trạng thái</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Chọn trạng thái...</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Không hoạt động</option>
        </select>
      </div>

      {/* Parameters */}
      <div className={cx('field-group')}>
        <label htmlFor="parameters">Tham số</label>
        <input
          type="text"
          id="parameters"
          value={parameters.join(", ")}
          onChange={(e) => setParameters(e.target.value.split(",").map(param => param.trim()))}
          placeholder="Nhập tham số, cách nhau bằng dấu phẩy"
        />
      </div>
    </div>
  );
};

export default Ga4;