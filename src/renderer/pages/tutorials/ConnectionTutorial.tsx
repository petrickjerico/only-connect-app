import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { Button, Divider, Modal, ModalDialog, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import DisplayClues from '../display/layout/DisplayClues'
import { useTranslation } from 'react-i18next'
import { stopAudio } from '../../utils/audios'
import { CluesBGM } from '../../../../assets/audios'
import { getTutorial } from '../../utils/tutorials'

export default function ConnectionTutorial({ verbose }: { verbose?: boolean }) {
  console.log(verbose)

  const { t, i18n } = useTranslation()
  const { connectionTutorial } = getTutorial(i18n.language)
  const [trial, setTrial] = useState<boolean>(false)

  return (
    <Stack direction='row' spacing={2} >
      <Stack minWidth='35%'>
        <Typography level='title-lg' pb={2}>
          {t('quick_glance')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<HelpRoundedIcon />}
          whiteSpace='pre'
          flexWrap='wrap'
        >
          {t('round1_description_question')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<AccessTimeFilledRoundedIcon />}
          whiteSpace='pre'
          flexWrap='wrap'
        >
          {t('round1_description_time')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CheckCircleRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round1_description_win')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<CancelRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round1_description_lose')}
        </Typography>
        <Typography
          variant='plain'
          startDecorator={<InfoRoundedIcon />}
          flexWrap='wrap'
        >
          {t('round1_description_info')}
        </Typography>
        <Button sx={{ mt: 2, py: 2 }} onClick={() => setTrial(true)} variant='soft' size='lg'>
          {t('try_out')}
        </Button>
        <Modal open={trial} onClose={() => {
          setTrial(false)
          stopAudio(CluesBGM)
        }}>
          <ModalDialog layout='fullscreen' sx={{ justifyContent: 'center' }}>
            <DisplayClues groupKey={'group1'} data={connectionTutorial} />
          </ModalDialog>
        </Modal>
      </Stack>
      <Divider orientation='vertical' />
      <Stack spacing={2}>
        <Typography level='title-lg'>
          {t('round_description')}
        </Typography>
        {t('round1_description_paragraph')
          .split('\n')
          .map((line, key) => (
            <Typography key={key}>
              {line}
            </Typography>
          ))}
      </Stack>
    </Stack>
  )
}
