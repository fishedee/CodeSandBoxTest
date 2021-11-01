import { Button, Dropdown, Menu, Space, Tag, Input, Table } from 'antd';
import {
  SearchOutlined,
  CheckCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';

type DataSourceType = {
  id: number;
  age: number;
  name: string;
  name2: string;
  name3: string;
  name4: string;
  name5: string;
};

const MyLabel: React.FC<any> = observer((props) => {
  const { data, dataKey } = props;
  return data[dataKey] || <></>;
});

const MyInput: React.FC<any> = observer((props) => {
  console.log('render MyInput');
  const { data, dataKey, ...resetProps } = props;

  return (
    <Input
      {...resetProps}
      value={data[dataKey]}
      onChange={(e) => {
        data[dataKey] = e.target.value;
      }}
    />
  );
});
const FormilyTable: React.FC<any> = observer((props) => {
  const data = useMemo(() => {
    return observable({
      list: [] as DataSourceType[],
    });
  }, []);
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
    data.list = result;
  }, []);
  const onAdd = () => {
    const newId = data.list.length;
    data.list = [
      ...data.list,
      {
        id: newId,
        age: newId + 100,
        name: 'name_' + newId,
        name2: 'name2_' + newId,
        name3: 'name3_' + newId,
        name4: 'name4_' + newId,
        name5: 'name5_' + newId,
      },
    ];
  };
  console.log('render top formily');
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
      render: (value: any, row: any, index: any) => {
        return <MyLabel data={row} dataKey={'name'} />;
      },
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      render: (value: any, row: any, index: any) => {
        return <MyInput data={row} dataKey={'name'} />;
      },
    },
    {
      title: '名字2',
      dataIndex: 'name2',
      key: 'name2',
      render: (value: any, row: any, index: any) => {
        return <MyInput data={row} dataKey={'name2'} />;
      },
    },
    {
      title: '名字3',
      dataIndex: 'name3',
      key: 'name3',
      render: (value: any, row: any, index: any) => {
        return <MyInput data={row} dataKey={'name3'} />;
      },
    },
    {
      title: '名字4',
      dataIndex: 'name4',
      key: 'name4',
      render: (value: any, row: any, index: any) => {
        return <MyInput data={row} dataKey={'name4'} />;
      },
    },
    {
      title: '名字5',
      dataIndex: 'name5',
      key: 'name5',
      render: (value: any, row: any, index: any) => {
        return <MyInput data={row} dataKey={'name5'} />;
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
        dataSource={data.list}
      />
    </div>
  );
});

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
      {isShow ? <FormilyTable key={isShow} /> : null}
    </div>
  );
};
export default Wrapper;
