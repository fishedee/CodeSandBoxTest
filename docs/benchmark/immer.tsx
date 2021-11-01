import { Button, Dropdown, Menu, Space, Tag, Input, Table } from 'antd';
import {
  SearchOutlined,
  CheckCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useState, useEffect, ChangeEvent, memo } from 'react';
import produce from 'immer';

type DataSourceType = {
  id: number;
  age: number;
  name: string;
  name2: string;
  name3: string;
  name4: string;
  name5: string;
};

const MyInput: React.FC<any> = memo((props) => {
  return <Input {...props} />;
});

const OriginTable: React.FC<any> = (props) => {
  const [data, setData] = useState<DataSourceType[]>([]);
  useEffect(() => {
    let result: DataSourceType[] = [];
    for (let i = 0; i != 100; i++) {
      result.push({
        id: i,
        age: i + 100,
        name: 'name_' + i,
        name2: 'name2_' + i,
        name3: 'name3_' + i,
        name4: 'name4_' + i,
        name5: 'name5_' + i,
      });
    }
    setData(result);
  }, []);
  const setName = (
    index: number,
    name: string,
    value: ChangeEvent<HTMLInputElement>,
  ) => {
    const newData = produce(data, (state) => {
      state[index][name] = value.target.value;
    });
    setData(newData);
  };
  const onAdd = () => {
    const newData = produce(data, (state) => {
      const newId = state.length;
      state.push({
        id: newId,
        age: newId + 100,
        name: 'name_' + newId,
        name2: 'name2_' + newId,
        name3: 'name3_' + newId,
        name4: 'name4_' + newId,
        name5: 'name5_' + newId,
      });
    });
    setData(newData);
  };
  console.log('render top origin');
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '名字显示',
      dataIndex: 'name',
      key: 'name2',
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      render: (value: any, row: any, index: any) => {
        return (
          <MyInput value={value} onChange={setName.bind(null, index, 'name')} />
        );
      },
    },
    {
      title: '名字2',
      dataIndex: 'name2',
      key: 'name2',
      render: (value: any, row: any, index: any) => {
        return (
          <MyInput
            value={value}
            onChange={setName.bind(null, index, 'name2')}
          />
        );
      },
    },
    {
      title: '名字3',
      dataIndex: 'name3',
      key: 'name3',
      render: (value: any, row: any, index: any) => {
        return (
          <MyInput
            value={value}
            onChange={setName.bind(null, index, 'name3')}
          />
        );
      },
    },
    {
      title: '名字4',
      dataIndex: 'name4',
      key: 'name4',
      render: (value: any, row: any, index: any) => {
        return (
          <MyInput
            value={value}
            onChange={setName.bind(null, index, 'name4')}
          />
        );
      },
    },
    {
      title: '名字5',
      dataIndex: 'name5',
      key: 'name5',
      render: (value: any, row: any, index: any) => {
        return (
          <MyInput
            value={value}
            onChange={setName.bind(null, index, 'name5')}
          />
        );
      },
    },
  ];

  return (
    <div>
      <button onClick={onAdd}>{'添加一行'}</button>
      <Table
        pagination={false}
        rowKey={'id'}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

const Wrapper: React.FC<any> = (props) => {
  const [isShow, setIsShow] = useState(0);
  const onClick = () => {
    setIsShow(isShow + 1);
  };
  //全局layout
  return (
    <div>
      <div>
        <button onClick={onClick}>{'点我刷新'}</button>
      </div>
      {isShow ? <OriginTable key={isShow} /> : null}
    </div>
  );
};
export default Wrapper;
