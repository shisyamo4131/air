const COMPANY_STATUS = {
  active: '活動中',
  expired: '閉鎖',
}

const COMPANY_STATUS_ARRAY = [
  { value: 'active', text: '活動中' },
  { value: 'expired', text: '閉鎖' },
]

const GENDER = {
  male: '男性',
  female: '女性',
}

const GENDER_ARRAY = [
  { value: 'male', text: '男性' },
  { value: 'female', text: '女性' },
]

const MEMBER_STATUS = {
  active: '加入中',
  expired: '脱退済',
}

const MEMBER_STATUS_ARRAY = [
  { value: 'active', text: '加入中' },
  { value: 'expired', text: '脱退済' },
]

const DEPENDENT_RELATION = {
  '01': '01: 実子・養子',
  '02': '02: 1以外の子',
  '03': '03: 父母・養父母',
  '04': '04: 義父母',
  '05': '05: 弟妹',
  '06': '06: 兄姉',
  '07': '07: 祖父母',
  '08': '08: 曽祖父母',
  '09': '09: 孫',
  10: '10: その他',
}

const DEPENDENT_RELATION_ARRAY = [
  { value: '01', text: '01: 実子・養子' },
  { value: '02', text: '02: 1以外の子' },
  { value: '03', text: '03: 父母・養父母' },
  { value: '04', text: '04: 義父母' },
  { value: '05', text: '05: 弟妹' },
  { value: '06', text: '06: 兄姉' },
  { value: '07', text: '07: 祖父母' },
  { value: '08', text: '08: 曽祖父母' },
  { value: '09', text: '09: 孫' },
  { value: '10', text: '10: その他' },
]

const SOCIAL_INSURANCE_STATUS = {
  '0:unapplied': '0: 未申請',
  '1:inProcess': '1: 申請中',
  '2:completed': '2: 加入中',
  '9:removed': '9: 異動（脱退）',
}

const SOCIAL_INSURANCE_STATUS_ARRAY = [
  { value: '0:unapplied', text: '0: 未申請' },
  { value: '1:inProcess', text: '1: 申請中' },
  { value: '2:completed', text: '2: 加入中' },
  { value: '9:removed', text: '9: 異動（脱退）' },
]

// 以下、使用することが確認でき次第↑へ
const CHAR_REGEXP = {
  全: '[ァ-ンヴー]',
  ア: '[ア-オ]',
  カ: '[カ-ゴ]',
  サ: '[サ-ゾ]',
  タ: '[タ-ド]',
  ナ: '[ナ-ノ]',
  ハ: '[ハ-ポ]',
  マ: '[マ-モ]',
  ヤ: '[ヤ-ヨ]',
  ラ: '[ラ-ロ]',
  ワ: '[ワ-ン]',
}

const CHAR_REGEXP_ARRAY = [
  { text: '全', value: '[ァ-ンヴー]' },
  { text: 'ア', value: '[ア-オ]' },
  { text: 'カ', value: '[カ-ゴ]' },
  { text: 'サ', value: '[サ-ゾ]' },
  { text: 'タ', value: '[タ-ド]' },
  { text: 'ナ', value: '[ナ-ノ]' },
  { text: 'ハ', value: '[ハ-ポ]' },
  { text: 'マ', value: '[マ-モ]' },
  { text: 'ヤ', value: '[ヤ-ヨ]' },
  { text: 'ラ', value: '[ラ-ロ]' },
  { text: 'ワ', value: '[ワ-ン]' },
]

const DEADLINE = {
  '05': '5日',
  10: '10日',
  15: '15日',
  20: '20日',
  25: '25日',
  99: '末日',
}

const DEADLINE_ARRAY = [
  { text: '5日', value: '05' },
  { text: '10日', value: '10' },
  { text: '15日', value: '15' },
  { text: '20日', value: '20' },
  { text: '25日', value: '25' },
  { text: '末日', value: '99' },
]

const EMPLOYEE_STATUS = {
  active: '在籍',
  expired: '退職',
}

const EMPLOYEE_STATUS_ARRAY = [
  { value: 'active', text: '在籍' },
  { value: 'expired', text: '退職' },
]

const LEAVE_APPLICATION_STATUS = {
  approved: '承認',
  unapproved: '未承認',
  reject: '却下',
}

const LEAVE_APPLICATION_STATUS_ARRAY = [
  { value: 'approved', text: '承認' },
  { value: 'unapproved', text: '未承認' },
  { value: 'reject', text: '却下' },
]

const LEAVE_APPLICATION_TYPE = {
  'non-paid': '1: 休暇',
  paid: '2: 有給休暇',
}

const LEAVE_APPLICATION_TYPE_ARRAY = [
  { value: 'non-paid', text: '1: 休暇' },
  { value: 'paid', text: '2: 有給休暇' },
]

const SECURITY_TYPE = {
  traffic: '交通誘導警備',
  jam: '雑踏警備',
  facility: '施設警備',
  patrol: '巡回警備',
}

const SECURITY_TYPE_ARRAY = [
  { value: 'traffic', text: '交通誘導警備' },
  { value: 'jam', text: '雑踏警備' },
  { value: 'facility', text: '施設警備' },
  { value: 'patrol', text: '巡回警備' },
]

const SITE_STATUS = {
  active: '稼働中',
  expired: '終了',
}

const SITE_STATUS_ARRAY = [
  { value: 'active', text: '稼働中' },
  { value: 'expired', text: '終了' },
]

const WORK_SHIFT = {
  day: '日勤',
  night: '夜勤',
  else: 'その他',
}

const WORK_SHIFT_ARRAY = [
  { value: 'day', text: '日勤' },
  { value: 'night', text: '夜勤' },
  { value: 'else', text: 'その他' },
]

export default (context, inject) => {
  inject('COMPANY_STATUS', COMPANY_STATUS)
  inject('COMPANY_STATUS_ARRAY', COMPANY_STATUS_ARRAY)
  inject('DEPENDENT_RELATION', DEPENDENT_RELATION)
  inject('DEPENDENT_RELATION_ARRAY', DEPENDENT_RELATION_ARRAY)
  inject('GENDER', GENDER)
  inject('GENDER_ARRAY', GENDER_ARRAY)
  inject('MEMBER_STATUS', MEMBER_STATUS)
  inject('MEMBER_STATUS_ARRAY', MEMBER_STATUS_ARRAY)
  inject('SOCIAL_INSURANCE_STATUS', SOCIAL_INSURANCE_STATUS)
  inject('SOCIAL_INSURANCE_STATUS_ARRAY', SOCIAL_INSURANCE_STATUS_ARRAY)
  inject('CHAR_REGEXP', CHAR_REGEXP)
  inject('CHAR_REGEXP_ARRAY', CHAR_REGEXP_ARRAY)
  inject('DEADLINE', DEADLINE)
  inject('DEADLINE_ARRAY', DEADLINE_ARRAY)
  inject('EMPLOYEE_STATUS', EMPLOYEE_STATUS)
  inject('EMPLOYEE_STATUS_ARRAY', EMPLOYEE_STATUS_ARRAY)
  inject('LEAVE_APPLICATION_STATUS', LEAVE_APPLICATION_STATUS)
  inject('LEAVE_APPLICATION_STATUS_ARRAY', LEAVE_APPLICATION_STATUS_ARRAY)
  inject('LEAVE_APPLICATION_TYPE', LEAVE_APPLICATION_TYPE)
  inject('LEAVE_APPLICATION_TYPE_ARRAY', LEAVE_APPLICATION_TYPE_ARRAY)
  inject('SECURITY_TYPE', SECURITY_TYPE)
  inject('SECURITY_TYPE_ARRAY', SECURITY_TYPE_ARRAY)
  inject('SITE_STATUS', SITE_STATUS)
  inject('SITE_STATUS_ARRAY', SITE_STATUS_ARRAY)
  inject('WORK_SHIFT', WORK_SHIFT)
  inject('WORK_SHIFT_ARRAY', WORK_SHIFT_ARRAY)
}
