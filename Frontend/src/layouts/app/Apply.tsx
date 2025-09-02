import { FileDoneOutlined, FormOutlined } from '@ant-design/icons';
import {
  Button,
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Space,
  Typography,
} from 'antd';
import { useState, useCallback } from 'react'; // useCallback for memoizing functions
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

const menuItems: MenuProps['items'] = [
  {
    key: '1',
    type: 'group',
    label: (
      <Typography.Title level={5} style={{ margin: 0 }}>
        <FileDoneOutlined style={{ marginRight: 8 }} />
        Applying for ASEAN National Trainer ID Membership Card
      </Typography.Title>
    ),
    children: [
      {
        key: '1-1',
        label: (
          <Link style={{ color: '#1890ff' }} to="/Certificate">
            1. New
          </Link>
        ),
      },
      {
        key: '1-2',
        label: (
          <Link style={{ color: '#1890ff' }} to="/apply/trainer/amend">
            2. Amend
          </Link>
        ),
      },
      {
        key: '1-3',
        label: (
          <Link style={{ color: '#1890ff' }} to="/apply/trainer/extension">
            3. Extension
          </Link>
        ),
      },
    ],
  },
  {
    key: '2',
    type: 'group',
    label: (
      <Typography.Title level={5} style={{ margin: 0 }}>
        <FileDoneOutlined style={{ marginRight: 8 }} />
        Applying for ASEAN National Assessor ID Membership Card
      </Typography.Title>
    ),
    children: [
      {
        key: '2-1',
        label: (
          <Link style={{ color: '#1890ff' }} to="/apply/assessor/new">
            1. New
          </Link>
        ),
      },
      {
        key: '2-2',
        label: (
          <Link style={{ color: '#1890ff' }} to="/apply/assessor/amend">
            2. Amend
          </Link>
        ),
      },
      {
        key: '2-3',
        label: (
          <Link style={{ color: '#1890ff' }} to="/apply/assessor/extension">
            3. Extension
          </Link>
        ),
      },
    ],
  },
  {
    key: '3',
    type: 'group',
    label: (
      <Typography.Title level={5} style={{ margin: 0 }}>
        <FileDoneOutlined style={{ marginRight: 8 }} />
        Applying for Accredited Training Schools
      </Typography.Title>
    ),
    children: [
      {
        key: '3-1',
        label: (
          <Link style={{ color: '#1890ff' }} to="/apply/training-school/new">
            {' '}
            {/* Semantic path for training schools */}
            1. New
          </Link>
        ),
      },
      {
        key: '3-2',
        label: (
          <Link style={{ color: '#1890ff' }} to="/apply/training-school/amend">
            {' '}
            {/* Semantic path for training schools */}
            2. Amend
          </Link>
        ),
      },
      {
        key: '3-3',
        label: (
          <Link
            style={{ color: '#1890ff' }}
            to="/apply/training-school/extension"
          >
            {' '}
            {/* Semantic path for training schools */}
            3. Extension
          </Link>
        ),
      },
    ],
  },
  {
    key: '4',
    type: 'group',
    label: (
      <Typography.Title level={5} style={{ margin: 0 }}>
        <FileDoneOutlined style={{ marginRight: 8 }} />
        Applying for ASEAN level skills certificate accredited by MOHT
      </Typography.Title>
    ),
    children: [
      {
        key: '4-1',
        label: (
          <Link style={{ color: '#1890ff' }} to="/apply/skills-certificate/new">
            {' '}
            {/* Semantic path for skills certificate */}
            1. New
          </Link>
        ),
      },
      {
        key: '4-2',
        label: (
          <Link
            style={{ color: '#1890ff' }}
            to="/apply/skills-certificate/amend"
          >
            {' '}
            {/* Semantic path for skills certificate */}
            2. Amend
          </Link>
        ),
      },
      {
        key: '4-3',
        label: (
          <Link
            style={{ color: '#1890ff' }}
            to="/apply/skills-certificate/extension"
          >
            {' '}
            {/* Semantic path for skills certificate */}
            3. Extension
          </Link>
        ),
      },
    ],
  },
];

const Apply = () => {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use useCallback to memoize handler functions
  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Handler for menu item clicks within the modal's menu
  const handleMenuItemClick: MenuProps['onClick'] = (e: unknown) => {
    console.log(e);
    closeModal();
    // You can add specific logic here if needed for each menu item click
    // For example, navigating to a different page or performing an action.
    // If clicking an item should close the modal, call closeModal()
    // closeModal(); // Uncomment if every menu item click should close the modal
  };

  return (
    <>
      {/* Conditional rendering for desktop vs. mobile */}
      {isMobile ? (
        <Button type="primary" onClick={showModal}>
          <Space>
            Apply
            <FormOutlined />
          </Space>
        </Button>
      ) : (
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Apply
              <FormOutlined />
            </Space>
          </a>
        </Dropdown>
      )}

      <Modal
        title="Apply Options" // More descriptive title
        open={isModalOpen}
        onOk={closeModal} // Both OK and Cancel actions close the modal
        onCancel={closeModal}
        footer={null} // Often, for a menu in a modal, you don't need footer buttons
        destroyOnHidden // Important for modals that contain forms or dynamic content
      >
        {/* Render the Menu component directly within the Modal */}
        <Menu
          mode="inline"
          items={menuItems}
          onClick={handleMenuItemClick} // Attach a handler for menu item clicks
        />
      </Modal>
    </>
  );
};

export default Apply;
