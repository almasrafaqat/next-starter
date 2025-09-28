import { useRouter } from '@/i18n/routing'
import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';

const BackButton = () => {
  const { router } = useRouter();
  const handleBack = () => {
    router.back();
  }
  return (
    <Button>
      <ArrowBack onClick={handleBack} />
    </Button>
  )
}

export default BackButton