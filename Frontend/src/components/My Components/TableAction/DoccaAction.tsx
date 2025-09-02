import { Dropdown, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";

type Props = {
    id: string;
    source: string; // add source base on the page
    customLabel?: string;
}

const DoccaAction = ({id, source, customLabel = 'Check'}: Props) => {
    const location = useLocation();
    const temp = [...location.pathname.split('/')];
    const link = '/' + temp[temp.length - 2];

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <Link to={link + '/Detail/' + id} state={{ source: source }}>{customLabel}</Link>,
        },
    ];
    return (
        <td>
        <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            arrow
            trigger={['click']}
        >
            <span style={{ cursor: 'pointer' }}>Action</span>
        </Dropdown>
        </td>
    );
}

export default DoccaAction;

