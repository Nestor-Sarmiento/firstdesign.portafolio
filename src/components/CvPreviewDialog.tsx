import { useState } from 'react'
import { AlertCircle, ArrowUpRight, Download, Info, LoaderCircle, RotateCcw } from 'lucide-react'
import { person } from '../data/cv'
import { useUi } from '../i18n/context'
import { Dialog } from './Dialog'
import { useToast } from './toast-context'

type Props = { open: boolean; onClose: () => void }

type ImageStatus = 'loading' | 'loaded' | 'error'

export function CvPreviewDialog({ open, onClose }: Props) {
  const t = useUi().cvPreview
  return (
    <Dialog open={open} onClose={onClose} title={t.title} description={t.desc} className="dialog--cv">
      <CvPreviewBody />
    </Dialog>
  )
}

function CvPreviewBody() {
  const ui = useUi()
  const t = ui.cvPreview
  const notify = useToast()
  const [status, setStatus] = useState<ImageStatus>('loading')
  const [attempt, setAttempt] = useState(0)
  const { preview } = person.cv
  const retrySuffix = attempt ? `?retry=${attempt}` : ''

  const retry = () => {
    setStatus('loading')
    setAttempt((n) => n + 1)
  }

  return (
    <>
      <div className="dialog__body cv-preview__body" aria-busy={status === 'loading'}>
        {status === 'error' ? (
          <div className="cv-preview__error" role="alert">
            <AlertCircle size={28} aria-hidden="true" />
            <p>
              <strong>{t.errorTitle}</strong>
            </p>
            <p className="muted">{t.errorDesc}</p>
            <button type="button" className="btn btn--secondary btn--sm" onClick={retry}>
              <RotateCcw size={16} aria-hidden="true" />
              {t.retry}
            </button>
          </div>
        ) : (
          <div className={`cv-preview__page ${status === 'loaded' ? 'is-loaded' : ''}`}>
            {status === 'loading' && (
              <p className="cv-preview__loading" role="status">
                <LoaderCircle size={22} aria-hidden="true" className="spin" />
                {t.loading}
              </p>
            )}
            <img
              key={attempt}
              src={`${preview.src}${retrySuffix}`}
              srcSet={attempt ? undefined : preview.srcSet}
              sizes="(max-width: 860px) calc(100vw - 4rem), 780px"
              width={preview.width}
              height={preview.height}
              alt={t.alt(person.shortName)}
              onLoad={() => setStatus('loaded')}
              onError={() => setStatus('error')}
            />
          </div>
        )}
      </div>

      <footer className="dialog__footer">
        {t.languageNote && (
          <p className="dialog__footer-note">
            <Info size={16} aria-hidden="true" />
            {t.languageNote}
          </p>
        )}
        <div className="dialog__footer-actions">
          <a
            href={person.cv.href}
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost btn--sm"
          >
            <span className="label-long">{t.open}</span>
            <span className="label-short" aria-hidden="true">
              {t.openShort}
            </span>
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only">{ui.common.opensNewTab}</span>
          </a>
          <a
            href={person.cv.href}
            download={person.cv.fileName}
            className="btn btn--primary btn--sm"
            onClick={() =>
              notify({
                tone: 'success',
                message: ui.hero.downloadStarted,
                description: ui.hero.downloadDesc(person.cv.fileName),
              })
            }
          >
            <Download size={16} aria-hidden="true" />
            {t.download}
          </a>
        </div>
      </footer>
    </>
  )
}
