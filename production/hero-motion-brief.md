# KLCC hero motion preflight — 2026-10-01

## Selected direction and source

The owner approved option 3, the kinetic community story. The first frame is the church's real worship image at `assets/worship.jpg` (1920×1080), already used in the approved composition. The logo, text, menu, and CTAs remain HTML. Generated motion, if accepted, is an illustrative animation of KLCC's source photo rather than documentary footage of an actual service.

The source shows stage performers at left, a congregational gathering at center/right, a ceiling grid with blue-violet lighting, and a fixed wide camera angle. Individual identities are not verified beyond the source photo. The stage and audience must not gain/lose people. Existing positions, clothing, fixtures, architectural edges and camera perspective remain stable. The hero's lower-left is reserved for sequential HTML copy; mobile crops near center-left must preserve the leader/gathering relationship.

## Causal passage

1. Opening hold: the exact image establishes stage leader and congregation.
2. Existing stage-left singer continues a worship phrase, taking a breath and gently moving her free hand; the microphone remains in the other hand.
3. A few visible congregants respond with small arm/head/weight changes. There is no choreographed synchronized wave.
4. Movement settles; the last frame stays compositionally calm for a freeze/blur transition to the next chapter.

The action is an invitation and communal response. It should read without invented dialogue, song lyrics, or audio. Motion is restrained because a busy crowd creates identity and limb-continuity risks.

## Impossibility and rejection ledger

Reject if faces or bodies morph, limbs duplicate, people appear/disappear, fixtures detach, the camera cuts or drifts enough to lose the approved composition, the microphone teleports, an arm moves through another person, stage lighting changes without its source, the crowd reacts before the leader, or the last frame is unsuitable for a still hold. Inspect the beginning, each human-motion moment, five arbitrary paused frames, ending, and desktop/mobile crops. A model response is a candidate, not an accepted film.

## Model evidence and cost

- Live OpenRouter `/videos/models` catalog on 2026-10-01: `google/veo-3.1-fast` supports first-frame image input, 8 s, 1080p, 16:9; no-audio 1080p pricing SKU $0.10/s = approximately $0.80 for one clip.
- [OpenRouter video API](https://openrouter.ai/docs/guides/overview/multimodal/video-generation): `frame_images` is an exact first frame, unlike `input_references`.
- [Google Cloud Veo 3.1 prompting guidance](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1/): structure camera, subject, action, context, and ambiance. The image-to-video prompt focuses on movement rather than redescribing identities.
- [Google DeepMind Veo](https://deepmind.google/models/veo/): manufacturer-reported image-to-video visual-quality and physics evaluations support consideration of the family, but do not prove this Fast version will preserve a crowded real photograph.
- Community reports of image-to-video identity drift are anecdotal and provider/version specific; they inform the narrow motion scope rather than establish a success rate.

The ready-made `gen_video.py` supports only a text payload. `scripts/video_job.py` is needed to submit this exact first-frame image. It performs a read-only catalog validation and redacted dry-run before any spend, and has a single-submission guard. No generation occurs until the owner approves the shown payload and estimate.
