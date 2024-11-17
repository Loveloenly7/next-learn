
import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
    //显示加载的组件 这个组因为是内嵌的 不需要等待数据
    return <DashboardSkeleton />;
  }