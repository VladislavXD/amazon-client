import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { useOptimisticViewsCount, useProductViewTracker } from '../../../hooks/useProductViews';
import { IoEyeSharp, IoAddOutline } from 'react-icons/io5';

// Демо компонент для тестирования автоматического обновления просмотров
const ViewsAutoUpdateDemo: React.FC = () => {
  const [productId, setProductId] = useState(1);
  const { viewsCount, isLoading } = useOptimisticViewsCount(productId, 0);
  const { trackView } = useProductViewTracker(productId);

  const handleAddView = () => {
    trackView();
  };

  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Демо автоматического обновления просмотров</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              label="ID товара"
              value={productId.toString()}
              onChange={(e) => setProductId(Number(e.target.value))}
              className="max-w-32"
            />
            <Button
              color="primary"
              onClick={handleAddView}
              startContent={<IoAddOutline />}
            >
              Добавить просмотр
            </Button>
          </div>

          <div className="flex items-center gap-3 p-3 bg-default-100 rounded-lg">
            <IoEyeSharp className="text-2xl text-primary" />
            <div>
              <p className="text-small text-default-600">Просмотров товара #{productId}:</p>
              <p className="text-2xl font-bold">
                {isLoading ? '...' : viewsCount}
              </p>
            </div>
          </div>

          <div className="text-small text-default-500 space-y-1">
            <p><strong>Как тестировать:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Нажмите "Добавить просмотр" - счетчик увеличится мгновенно</li>
              <li>Откройте эту страницу в другой вкладке - там тоже обновится счетчик</li>
              <li>Измените ID товара для тестирования разных товаров</li>
              <li>Повторные клики не засчитываются (дедупликация в рамках часа)</li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewsAutoUpdateDemo;
